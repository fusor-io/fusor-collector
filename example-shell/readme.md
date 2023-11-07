This directory contains examples of shell scripts for collecting stats of Raspberry Pi, EP-0118 UPS for Raspberry and Network devices

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

To collect power stats, you can use this collector definition:

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

# TimeZone offset in hours (including unusual timezones, eg. from Australia)

To collect timezone offset, you can use this collector definition:

```JSON
{
    "targetNode": "@hub",
    "source": {
        "type": "shell",
        "uri": "timezone"
    },
    "schedule": "1 0 * * *",
    "pipes": {
        "tz": {}
    }
}
```

# Devices connected to your local network

```JSON
{
    "targetNode": "network",
    "source": {
        "type": "shell",
        "uri": "network-scan"
    },
    "schedule": "*/1 * * * *",
    "tablePipes": [{
        "extract": null,
        "type": "csv",
        "params": {
			"delimiter": ",",
			"escape": null
		},
        "elements":[
            {
                "name": "$replace($[0], ':', '')",
                "value": "$[1]",
                "postProcess": []
            }
        ]
    }]
}
```

# Response time from the remote urls. If you see response time 0, that means call failed. Otherwise you will get response time. GET method is used to fetch the url contents

```JSON
{
    "targetNode": "servers",
    "source": {
        "type": "shell",
        "uri": "ping-servers google=https://www.google.com yahoo=https://finance.yahoo.com/quote/QQQ"
    },
    "schedule": "*/5 * * * *",
    "tablePipes": [{
        "extract": null,
        "type": "csv",
        "params": {
			"delimiter": " ",
			"escape": null
		},
        "elements":[
            {
                "name": "$[0]",
                "value": "$[1]",
                "postProcess": []
            }
        ]
    }]
}
```
