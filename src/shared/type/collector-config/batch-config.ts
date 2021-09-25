/**
 * For each item in `batchItems`:
 *  1. item its value is used to interpolate `${item}` inside `uri` in `SourceConfig`
 * @example
 *    {
 *      type: 'url',
 *      uri: 'https://finance.yahoo.com/quote/${item}',
 *      batchItems: ['msft','aapl','tsla']
 *    }
 *
 *  2. item is used to interpolate `${item}` inside `targetNode`.
 *  If target node is not specified item is appended to definition key
 *
 * @example
 *   Given that definition key is `yahoo_stock_` or `targetNode` is `yahoo_stock_${item}`
 *   `batchItems` example above will produce these nodes in a hub db:
 *     - yahoo_stock_msft
 *     - yahoo_stock_aapl
 *     - yahoo_stock_tsla
 * 
 * Optional delay is used between running each batch iteration.
 */

export interface BatchConfig {
  items: string[];
  delay?: number;
}
