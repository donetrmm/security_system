import bcrypt from "bcrypt";

import { IEcryptService } from "../../application/Services/IEncryptService";

export class EncryptService implements IEcryptService {
  encodePassword(password: string): string {
    const pass = bcrypt.hashSync(password, parseInt(process.env.SALTOS_BCRYPT || "20"));

    return pass;
  }
  authPassword(password: string, passwordEncode: string): boolean {
    const result = bcrypt.compareSync(password, passwordEncode);
    return result;
  }
}
