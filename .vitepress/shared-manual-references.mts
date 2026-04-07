import fs from "fs";
import path from "path";
import type MarkdownIt from "markdown-it";

const MANUAL_PREFIX = "doc/manual/en/";
const REFERENCES_FILE = "doc/manual/en/99-references.md";

function isManualPage(relativePath: string | undefined): boolean {
   return (
      typeof relativePath === "string" &&
      relativePath.startsWith(MANUAL_PREFIX) &&
      relativePath !== REFERENCES_FILE
   );
}

function loadReferenceBlock(srcDir: string): string {
   const referencesPath = path.resolve(srcDir, REFERENCES_FILE);
   return fs.readFileSync(referencesPath, "utf8").trim();
}

export function withSharedManualReferences(md: MarkdownIt, srcDir: string): void {
   const sharedReferenceBlock = loadReferenceBlock(srcDir);

   md.core.ruler.before("block", "inject-shared-manual-references", (state) => {
      if (!isManualPage(state.env?.relativePath)) {
         return;
      }

      if (state.env.__sharedManualRefsInjected) {
         return;
      }

      state.env.__sharedManualRefsInjected = true;

      // Make shared reference definitions available before block/inline parsing.
      state.src += `\n\n${sharedReferenceBlock}\n`;
   });
}
