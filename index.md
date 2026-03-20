---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "pgmoneta"
  tagline: pgmoneta is a backup / restore solution for PostgreSQL
  actions:
    - theme: brand
      text: Getting started
      link: /gettingstarted.md
    - theme: alt
      text: Releases
      link: /releases

features:
  - title: Full backup
    details: Create complete PostgreSQL backups with a straightforward workflow for protecting entire database clusters.
  - title: Incremental backup (PostgreSQL 14+)
    details: Reduce backup time and storage usage by capturing only changed data between backup runs.
  - title: Restore
    details: Recover backups quickly and reliably when databases need to be rebuilt or rolled back.
  - title: Compression (gzip, zstd, lz4, bzip2)
    details: Choose from multiple compression formats to balance storage efficiency and backup performance.
  - title: AES encryption support
    details: Protect backup data at rest with built-in AES encryption support for sensitive environments.
  - title: Symlink support
    details: Preserve symbolic links correctly so restored environments match the original layout.
  - title: WAL shipping support
    details: Archive and manage WAL files as part of a robust continuous backup and recovery strategy.
  - title: Hot standby
    details: Work with PostgreSQL hot standby setups as part of high-availability and recovery workflows.
  - title: Prometheus support
    details: Expose operational metrics for monitoring, alerting, and observability with Prometheus.
  - title: Remote management
    details: Administer pgmoneta remotely through its management interface when local access is not available.
  - title: Offline detection
    details: Detect unavailable servers and react more safely when backup targets go offline.
  - title: Transport Layer Security (TLS) v1.2+ support
    details: Secure client and server communication with modern TLS support for networked deployments.
  - title: Daemon mode
    details: Run pgmoneta as a long-lived background service suited for automated backup operations.
  - title: User vault
    details: Store and manage user-related credentials and secrets in a safer operational workflow.
  - title: Model Context Protocol (MCP)
    details: Integrate pgmoneta with MCP-compatible tooling to support richer automation and assisted workflows.
---
