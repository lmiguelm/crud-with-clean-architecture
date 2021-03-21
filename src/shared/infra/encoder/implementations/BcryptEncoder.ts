import { IEncoder } from '../IEnconder';
import bcrypt from 'bcrypt';

export class BcryptEncoder implements IEncoder {
  async encode(value: string): Promise<string> {
    return await bcrypt.hash(value, bcrypt.genSaltSync());
  }
  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
