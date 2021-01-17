This directory contains examples of shell scripts for collecting stats of Raspberry Pi and EP-0118 UPS for Raspberry

# Raspberry Pi stats

To collect Core temperature you need such collector definition:
```JSON
{
    "targetNode": "rpi",
    "source": {
        "type": "shell",
        "uri": "rasp-pi"
    },
    "schedule": "*/1 * * * *",
    "pipes": {
        "temp_c": {
            "postProcess": [
                {
                    "type": "match",
                    "command": {
                        "pattern": "(temp=)([0-9.]+)",
                        "flags": "i",
                        "group": 2
                    }
                }
            ]
        }
    }
}
```

To collect SD card space stats:

```JSON
{
    "targetNode": "rpi",
    "source": {
        "type": "shell",
        "uri": "rasp-pi"
    },
    "schedule": "*/30 * * * *",
    "pipes": {
        "disk_free_kb": {
            "postProcess": [
                {
                    "type": "match",
                    "command": {
                        "pattern": "mmcblk0p1\\s+\\d+\\s+(\\d+)\\s+(\\d+)",
                        "flags": "i",
                        "group": 2
                    }
                }
            ]
        },
        "disk_used_kb": {
            "postProcess": [
                {
                    "type": "match",
                    "command": {
                        "pattern": "mmcblk0p1\\s+\\d+\\s+(\\d+)\\s+(\\d+)",
                        "flags": "i",
                        "group": 1
                    }
                }
            ]
        }
    }
}
```

# UPS stats

If EP-0118 mounted directly on Raspberry Pi, it supports some info through I2C.
Setup details: [https://wiki.52pi.com/index.php/UPS_(With_RTC_%26_Coulometer)_For_Raspberry_Pi_SKU:_EP-0118]

To collect power stats, you ca use this collector definition:
```JSON
{
    "targetNode": "ups",
    "source": {
        "type": "shell",
        "uri": "ups"
    },
    "schedule": "*/1 * * * *",
    "pipes": {
        "power_mw": {
            "postProcess": [
                {
                    "type": "match",
                    "command": {
                        "pattern": "(Power: )([0-9.]+)",
                        "flags": "i",
                        "group": 2
                    }
                }
            ]
        }
    }
}
```