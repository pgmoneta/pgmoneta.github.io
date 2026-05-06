import fs from "fs";
import path from "path";
import type MarkdownIt from "markdown-it";

const MANUAL_PREFIX = "doc/manual/en/";
const REFERENCES_FILE = "doc/manual/en/99-references.md";
// Match only markdown reference link definitions: [key]: url
// This pattern explicitly rejects headings, lists, text, or any other content
const REFERENCE_DEFINITION_PATTERN = /^\s*\[[^\]]+\]:\s*\S+.*$/gm;

function isManualPage(relativePath: string | undefined): boolean {
   return (
      typeof relativePath === "string" &&
      relativePath.startsWith(MANUAL_PREFIX) &&
      relativePath !== REFERENCES_FILE
   );
}

function loadReferenceDefinitions(srcDir: string): string {
   const referencesPath = path.resolve(srcDir, REFERENCES_FILE);
   const referencesContent = fs.readFileSync(referencesPath, "utf8");
   // Extract only markdown reference definitions (link keys and URLs)
   // Filters out all headings, descriptions, lists, and other renderable content
   const definitions = (referencesContent.match(REFERENCE_DEFINITION_PATTERN) ?? []).map(def => def.trim()).filter(def => def.length > 0);

   return definitions.join("\n");
}

export function withSharedManualReferences(md: MarkdownIt, srcDir: string): void {
   const sharedReferenceBlock = loadReferenceDefinitions(srcDir);

   md.core.ruler.before("block", "inject-shared-manual-references", (state) => {
      if (!isManualPage(state.env?.relativePath)) {
         return;
      }

      if (state.env.__sharedManualRefsInjected || !sharedReferenceBlock) {
         return;
      }

      state.env.__sharedManualRefsInjected = true;

      // Make only the shared reference definitions available before block/inline parsing.
      state.src += `\n\n${sharedReferenceBlock}\n`;
   });
}
