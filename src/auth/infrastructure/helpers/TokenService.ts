import { ITokenService } from "../../application/Services/TokenService";
import jwt from 'jsonwebtoken'

export class TokenService implements ITokenService {
  generarToken(payload: string): string {
    try {
        const jwtSecret = process.env.JWT_SECRET || "secret";
        const payloadFormatted = {
            correo: payload,
            secureWord: process.env.SECURE_WORD
        }
        const token = jwt.sign(payloadFormatted, jwtSecret, { expiresIn: '8h' });
        return token;
    } catch (error) {
        return "undefined"
    }
  }
  verificarToken(token: string): boolean {
    try {
        const jwtSecret = process.env.JWT_SECRET ;
        jwt.verify(token, jwtSecret || "secret");
        return true;
    } catch (error) {
        return false;
    }
  }
}
