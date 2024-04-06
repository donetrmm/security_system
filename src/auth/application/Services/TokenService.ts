export interface ITokenService {
    verificarToken(token: string): boolean;
    generarToken(payload: string): string;
  }
  