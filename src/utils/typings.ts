export type FormatFunction<TResult = object> = (chunk: string) => TResult[];

export interface WritableStreamOptions {
  connectionUri: string;
  dbName: string;
  collectionName: string;
  format?: FormatFunction;
}
