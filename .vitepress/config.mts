import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
   title: "pgmoneta",
   description: "Documentation website for pgmoneta",
   themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
         { text: "Home", link: "/" },
         { text: "Documentation", link: "/documentation" },
         { text: "Configuration", link: "/configuration" },
         { text: "Metrics", link: "/metrics" },
         { text: "News", link: "/news" },
         { text: "About", link: "/about" },
      ],

      footer: {
         message:
            "<span class='vp-doc'><a href='https://pgmoneta.github.io/'>Backup / restore solution </a></span> for <span class='vp-doc'><a href='https://www.postgresql.org/'>PostgreSQL</a></span>",
         copyright:
            "© 2024 <span class='vp-doc'><a href='https://pgmoneta.github.io/'>The pgmoneta community</a></span> (<span class='vp-doc'><a href='http://creativecommons.org/licenses/by/4.0/'>CC BY 4.0</a></span>)",
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
            text: "Tutorials",
            collapsed: false,
            items: [
               {
                  text: "Installing pgmoneta",
                  link: "/tutorials/01_install"
               },
               {
                  text: "Enabling remote management",
                  link: "/tutorials/02_remote_management"
               },
               {
                  text: "Enabling Prometheus metrics",
                  link: "/tutorials/03_prometheus"
               },
               {
                  text: "Doing backup and restore",
                  link: "/tutorials/04_backup_restore"
               },
               {
                  text: "Creating an archive",
                  link: "/tutorials/05_archive"
               },
               {
                  text: "Deleting a backup", 
                  link: "/tutorials/06_delete"
               },
               {
                  text: "Encryption and decryption",
                  link: "/tutorials/07_encryption"
               },
               {
                  text: "Retention Policy",
                  link: "/tutorials/08_retention"
               },
               {
                  text: "Grafana Dashboard",
                  link: "/tutorials/09_grafana"
               },
               {
                  text: "WAL shipping",
                  link: "/tutorials/10_wal_shipping"
               },
               {
                  text: "Transport Level Security",
                  link: "/tutorials/11_tls"
               },
               {
                  text: "Hot standby",
                  link: "/tutorials/12_hot_standby"
               },
            ],
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
