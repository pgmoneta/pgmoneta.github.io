import { defineConfig } from "vitepress";
import { withSharedManualReferences } from "./shared-manual-references.mts";
import sidebar from './sidebar.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
   title: "pgmoneta",
   description: "Documentation website for pgmoneta",
   ignoreDeadLinks: [
      /^https?:\/\/localhost/,
      /\/doc\/manual\/README/,
      /\/doc\/manual\/CODE_OF_CONDUCT/
   ],
   srcExclude: [
      "vendor/**",
      "node_modules/**",
      "_site/**",
   ],
   markdown: {
      config(md) {
         withSharedManualReferences(md, process.cwd());
      }
   },
   themeConfig: {
      logo: {
         src: "/images/logo-reversed-transparent-32.png",
         alt: "pgmoneta logo",
         width: "20",
         height: "20",
      },
      // https://vitepress.dev/reference/default-theme-config
      nav: [
         { text: "Home", link: "/" },
         { text: "Documentation", link: "/doc/GETTING_STARTED" },
         { text: "Configuration", link: "/doc/CONFIGURATION" },
         { text: "Metrics", link: "/doc/PROMETHEUS" },
         { text: "MCP", link: "/mcp" },
         { text: "News", link: "/news" },
         { text: "Developers", link: "/doc/DEVELOPERS" },
         { text: "About", link: "/about" },
      ],

      footer: {
         message:
            "<span class='vp-doc'><a href='https://pgmoneta.github.io/'>Backup / restore solution </a></span> for <span class='vp-doc'><a href='https://www.postgresql.org/'>PostgreSQL</a></span>",
         copyright:
            "© 2026 <span class='vp-doc'><a href='https://pgmoneta.github.io/'>The pgmoneta community</a></span> (<span class='vp-doc'><a href='http://creativecommons.org/licenses/by/4.0/'>CC BY 4.0</a></span>)",
      },

      sidebar: [
         {
            text: "Home",
            link: "/"
         },
         {
            text: "Getting Started",
            link: "/doc/GETTING_STARTED"
         },
         {
            text: "Configuration",
            link: "/doc/CONFIGURATION"
         },
         {
            text: "Releases",
            link: "/releases"
         },
         {
            text: "PDF Manual",
            link: "/manuals"
         },
         {
            text: "User Manual",
            collapsed: false,
            items: sidebar
         },
         {
            text: "Code of Conduct",
            link: "/CODE_OF_CONDUCT"
         },
         {
            text: "GitHub Issues",
            link: "https://github.com/pgmoneta/pgmoneta/issues",
         },
         {
            text: "GitHub Discussions",
            link: "https://github.com/pgmoneta/pgmoneta/discussions",
         },
         {
            text: "LICENSE",
            link: "https://opensource.org/licenses/BSD-3-Clause",
         },
      ],

       socialLinks: [{ icon: "github", link: "https://github.com/pgmoneta" }],
    },
 });
