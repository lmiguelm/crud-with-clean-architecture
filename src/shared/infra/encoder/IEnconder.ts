export interface IEncoder {
  encode(value: string): Promise<string>;
  compare(value: string, encode: string): Promise<boolean>;
}
