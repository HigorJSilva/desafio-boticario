import { hash } from 'bcrypt';
import { IHashProvider } from 'src/shared/interfaces/hash.provider';

class BcryptAdapter implements IHashProvider {
  public async generate(payload: string): Promise<string> {
    return await hash(payload, 8);
  }
}

export default BcryptAdapter;
