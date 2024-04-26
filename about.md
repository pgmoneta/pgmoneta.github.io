Features
--------

*   Full backup
*   Restore
*   Compression (gzip, zstd, lz4)
*   AES encryption support
*   Symlink support
*   WAL shipping support
*   Hot standby
*   Prometheus support
*   Remote management
*   Transport Layer Security (TLS) v1.2+ support
*   Daemon mode
*   User vault

Overview
--------

pgmoneta makes use of

`pgmoneta` makes use of

* Process model
* Shared memory model across processes
* [libev](http://software.schmorp.de/pkg/libev.html) for fast network interactions
* [Atomic operations](https://en.cppreference.com/w/c/atomic) are used to keep track of state

See [Architecture](./ARCHITECTURE.md) for the architecture of `pgmoneta`.

Further information
-------------------

*   [GitHub](https://github.com/pgmoneta/pgmoneta)

Related projects
----------------

*   [pgagroal](https://agroal.github.io/pgagroal/) - High-performance connection pool for PostgreSQL
*   [pgexporter](https://pgexporter.github.io/) - Prometheus exporter for PostgreSQL