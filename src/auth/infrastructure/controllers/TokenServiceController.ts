import { NextFunction, Request, Response } from "express";
import { ITokenService } from "../../application/Services/TokenService";
import { token } from "morgan";

export class VerificarTokenController {
  constructor(readonly tokenService: ITokenService) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const token = req.get('Authorization');
    try {
      const tokenVerified = await this.tokenService.verificarToken(token || "");
      if (tokenVerified) {
        next()
      } else {
        res.status(401).json({
            message: "Error al validar token.",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: "Ocurrió un error al procesar la solicitud.",
        error: error.message,
      });
    }
  }
}
