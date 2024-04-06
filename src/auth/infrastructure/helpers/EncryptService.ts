import bcrypt from "bcrypt";

import { IEcryptService } from "../../application/Services/IEncryptService";

export class EncryptService implements IEcryptService {
  encodePassword(password: string): string {
    const saltos =  parseInt(process.env.SALTOS_BCRYPT || "10")
    const pass = bcrypt.hashSync(password, saltos);
    return pass;
  }
  authPassword(password: string, passwordEncode: string): boolean {
    const result = bcrypt.compareSync(password, passwordEncode);
    
    return result;
  }
}
