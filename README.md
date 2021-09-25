# What is this?

This is external numeric data ingestion service for Smart House. It cat fetch data from:

- REST API service
- Web page
- local shell script

Examples of usage:

- read weather conditions
- read geomagnetic activity
- read stock data
- scan status of devices on the local network

# How it works?

Process is like this:
Scrap data from the source => extract values => post-process values => write values to `Fusor Hub`

`Scrapper` is responsible for fetching raw data from the source:

- by reading from url and providing raw data form `HTTP` response body
- by reading from REST API
- by executing shell command and reading raw data from the output stream

Result of `Scrapper` is forwarded to one or more `Pipes` or `TablePipes`.
Each `Pipe` extracts one resulting value. So many parameters can be fetched by running a single scrap operation.
`Pipe` consists of `Extractor` and `PostProcessor`.
`TablePipe` consists of `Extractor` reading data from `HTML`, `CSV` or `JSON` table. Each table `line` or `column` is evaluated using [JSONata](https://jsonata.org) query and forwarded to optional `PostProcessor`

`Extractor` receives raw data from the `Scrapper` and can:

- extract content from `HTML` using `CSS` selector and optionally convert selected `HTML` to text using several filters
- extract content from `JSON` using [JSONata](https://jsonata.org) queries

`PostProcessor` receives data from the `Extractor` and can:

- perform set of `Regex replace` and/or `Regex match` operations

Result of each `Pipe` is intelligently converted to a number using `numeral` library and posted into specified `Node` `Parameter` on the `Fusor Hub`

# Prerequisites

Running `Fusor Hub` server [https://github.com/fusor-io/fusor-hub]
All ingestion configurations should be stored in `Fusor Hub`

# Example

This is example of configuration for reading solar activity data from NOAA service.

```JSON
{
  "targetNode": "solar",
  "source": {
    "type": "url",
    "uri": "http://services.swpc.noaa.gov/products/noaa-planetary-k-index.json",
    "headers": { "Content-Type": "application/json" }
  },
  "schedule": "*/30 * * * *",
  "pipes": { "kp": { "extract": { "type": "json", "query": "$[-1][1]" } } }
}
```

Use Postman to upload this configuration to the `Fusor Hub` server:

`PUT http://<your server ip>/definitions/collector/solar`


Examples of using shell scripts for data collection can be found [here](./example-shell/readme.md)

