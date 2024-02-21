export interface IHashProvider {
  generate(payload: string): Promise<string>;
}
