export interface IEcryptService {
  encodePassword(password: string): string;
  authPassword(password: string, passwordEncode: string): boolean;
}
