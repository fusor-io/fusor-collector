export type JsonProp = string | number | boolean | null | undefined | JsonArray | JsonMap;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JsonMap extends Record<string, JsonProp> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JsonArray extends Array<string | number | boolean | null | JsonArray | JsonMap> {}
export type Json = undefined | JsonMap | JsonArray | string | number | boolean | null;

export type JsonObject = JsonMap | JsonArray;

export function isJsonMap(value: any): value is JsonMap {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export function isJsonArray(value: any): value is JsonArray {
  return !!value && Array.isArray(value);
}
