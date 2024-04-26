Metrics
-------

### pgmoneta_state

The state of pgmoneta

*   1 = Running

### pgmoneta_version

The version of pgmoneta

*   1 = Running

### pgmoneta_retention_days

The retention of pgmoneta in days

### pgmoneta_retention_weeks

The retention of pgmoneta in weeks

### pgmoneta_retention_months

The retention of pgmoneta in months

### pgmoneta_retention_years

The retention of pgmoneta in years

### pgmoneta_retention_server

The retention a server in days

### pgmoneta_compression

The compression used

*   0 = None
*   1 = GZip
*   2 = ZSTD
*   3 = LZ4
*   4 = BZIP2

### pgmoneta_link

Use links to limit backup size

*   1 = Yes
*   0 = No

### pgmoneta_used_space

The disk space used for pgmoneta

### pgmoneta_free_space

The free disk space for pgmoneta

### pgmoneta_total_space

The total disk space for pgmoneta

### pgmoneta_server_valid

Is the server in a valid state

### pgmoneta_wal_streaming

The WAL streaming status of a server

### pgmoneta_wal_shipping

The disk space used for WAL shipping for a server

### pgmoneta_wal_shipping_used_space

The disk space used for everything under the WAL shipping directory of a server

### pgmoneta_wal_shipping_free_space

The free disk space for the WAL shipping directory of a server

### pgmoneta_wal_shipping_total_space

The total disk space for the WAL shipping directory of a server

### pgmoneta_server_operation_count

The count of client operations of a server

### pgmoneta_server_failed_operation_count

The count of failed client operations of a server

### pgmoneta_server_last_operation_time

The time of the latest client operation of a server

### pgmoneta_server_last_failed_operation_time

The time of the latest failed client operation of a server

### pgmoneta_server_timeline

The current timeline a server is on

|name|The identifier for the server|
|--- |--- |


### pgmoneta_server_parent_tli

The parent timeline of a timeline on a server

|name|The identifier for the server|
|--- |--- |
|tli|The current/previous timeline ID in the server history|


### pgmoneta_server_timeline_switchpos

The WAL switch position of a timeline on a server (showed in hex as a parameter)

|name|The identifier for the server|
|--- |--- |
|tli|The current/previous timeline ID in the server history|
|walpos|The WAL switch position of this timeline|

### pgmoneta_server_workers

The number of workers for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_backup_oldest

The oldest backup for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_backup_newest

The newest backup for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_backup_count

The number of valid backups for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_backup

Is the backup valid for a server

|name|The identifier for the server|
|--- |--- |

|label||The backup label|

### pgmoneta_backup_version

The version of PostgreSQL for a backup

|name|The identifier for the server|
|--- |--- |
|label | The backup label |
|major| The backup PostgreSQL major version |
|minor| The backup PostgreSQL minor version |

### pgmoneta_backup_end_timeline

The ending timeline of a backup for a server

|name|The identifier for the server|
|--- |--- |
|label| backup label|

### pgmoneta_backup_throughput

The throughput of the backup for a server (bytes/s)

|name|The identifier for the server|
|--- |--- |
|label| backup label|

### pgmoneta_backup_elapsed_time

The backup in seconds for a server

|name|The identifier for the server|
|--- |--- |
|label| backup label|

### pgmoneta_backup_start_timeline

The starting timeline of a backup for a server

|name|The identifier for the server|
|--- |--- |
|label| backup label|

### pgmoneta_backup_start_walpos

The starting WAL position of a backup for a server


|name|The identifier for the server|
|--- |--- |
|label| backup label|
|walpos| The backup starting WAL position|

### pgmoneta_backup_end_walpos

The ending WAL pos of a backup for a server \\n");

|name|The identifier for the server|
|--- |--- |
|label| backup label|
|walpos| The backup ending WAL position|

### pgmoneta_backup_checkpoint_walpos

|name|The identifier for the server|
|--- |--- |
|label| backup label|
|walpos| The backup checkpoint WAL position|

### pgmoneta_restore_newest_size

The size of the newest restore for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_backup_newest_size

The size of the newest backup for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_restore_size

The size of a restore for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_restore_size_increment

The increment size of a restore for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_backup_size

The size of a backup for a server

|name|The identifier for the server|
|--- |--- |
|label| The backup label|

### pgmoneta_backup_compression_ratio

The ratio of backup size to restore size for each backup

|name|The identifier for the server|
|--- |--- |

|label| The backup label|

### pgmoneta_backup_retain

Retain a backup for a server
|name|The identifier for the server|
|--- |--- |
|label| The backup label|

### pgmoneta_backup_total_size

The total size of the backups for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_wal_total_size

The total size of the WAL for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_total_size

The total size for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_active_backup

Is there an active backup for a server

|name|The identifier for the server|
|--- |--- |

### pgmoneta_current_wal_file

The current streaming WAL filename of a server

|server|The identifier for the server|
|--- |--- |
|file|The current WAL filename for this server|

### pgmoneta_current_wal_lsn

The current WAL log sequence number

|server|The identifier for the server|
|--- |--- |
|lsn |The current WAL log sequence number|