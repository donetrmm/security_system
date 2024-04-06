import { ITokenService } from "./Services/TokenService";

export class VerificarTokenUseCae {
  constructor(
    readonly tokenService: ITokenService
  ) {}

  async run(tokenn: string): Promise<Boolean | null> {
    try {
      const tokenCorrecto = await this.tokenService.verificarToken(tokenn);
      if (!tokenCorrecto) {
          return null
      }

      return true;
    } catch (error) {
      return null;
    }
  }
}
