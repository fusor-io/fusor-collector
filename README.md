# How it works

Process is like this:
Scrap data from the source => extract values => post-process values => write values to `Gateway`

`Scrapper` is responsible for fetching raw data from the source:
- by reading from url and providing raw data form `HTTP` response body
- by executing shell command and reading raw data from the output stream

Result of `Scrapper` is forwarded to one or more `Pipes`.
Each `Pipe` extracts one resulting value. So many parameters can be fetched by running a single scrap operation.
`Pipe` consists of `Extractor` and `PostProcessor`.

`Extractor` receives raw data from the `Scrapper` and can:
- extract content from `HTML` using `CSS` selector and optionally convert selected `HTML` to text using several filter
- extract content from `JSON` using `JSONata` queries

`PostProcessor` receives data from the `Extractor` and can:
- perform set of `Regex replace` and/or `Regex match` operations

Result of each `Pipe` is converted to a number and posted into specified `Node` `Parameter` on the `Gateway`

