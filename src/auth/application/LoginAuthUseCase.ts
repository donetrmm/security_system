import { Auth } from "../domain/Auth";
import { AuthRepository } from "../domain/AuthRepository";
import { IEcryptService } from "./Services/IEncryptService";
import { ITokenService } from "./Services/TokenService";


export class Login {
  constructor(
    readonly authRepository: AuthRepository,
    readonly encryptService: IEcryptService,
    readonly tokenService: ITokenService
  ) {}

  async run(correo: string, password: string): Promise<Object | null> {
    try {
      const usuario = await this.authRepository.login(correo);
      if (!usuario) return null;

      const passwordCorrecto = await this.encryptService.authPassword(password, usuario.password);
      if (!passwordCorrecto) {
          return null
      }
      const token = await this.tokenService.generarToken(usuario.correo)
      const auth = {
        token: token,
      }
      return auth;
    } catch (error) {
      return null;
    }
  }
}
