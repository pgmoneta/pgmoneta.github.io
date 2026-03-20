import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
   title: "pgmoneta",
   description: "Documentation website for pgmoneta",
   srcExclude: ["vendor/**"],
   themeConfig: {
      logo: {
         src: "/images/logo-reversed-transparent-32.png",
         alt: "pgmoneta logo",
         width: "20",
         height: "20",
      },
      // https://vitepress.dev/reference/default-theme-config
      nav: [
         { text: "Documentation", link: "/documentation" },
         { text: "Configuration", link: "/configuration" },
         { text: "Metrics", link: "/metrics" },
         { text: "MCP", link: "/mcp" },
         { text: "News", link: "/news" },
         { text: "Developers", link: "/developers" },
         { text: "About", link: "/about" },
      ],

      footer: {
         message:
            "<span class='vp-doc'><a href='https://pgmoneta.github.io/'>Backup / restore solution </a></span> for <span class='vp-doc'><a href='https://www.postgresql.org/'>PostgreSQL</a></span>",
         copyright:
            "© 2025 <span class='vp-doc'><a href='https://pgmoneta.github.io/'>The pgmoneta community</a></span> (<span class='vp-doc'><a href='http://creativecommons.org/licenses/by/4.0/'>CC BY 4.0</a></span>)",
      },

      sidebar: [
         {
            text: "Home",
            link: "/"
         },
         {
            text: "Getting Started",
            link: "/gettingstarted"
         },
         {
            text: "Releases",
            link: "/releases"
         },
         {
            text: "Manuals",
            link: "/manuals"
         },
         {
            text: "GitHub",
            link: "https://github.com/pgmoneta/pgmoneta/",
         },
         {
            text: "LICENSE",
            link: "https://opensource.org/licenses/BSD-3-Clause",
         },
      ],

       socialLinks: [{ icon: "github", link: "https://github.com/pgmoneta" }],
    },
 });
