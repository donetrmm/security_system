import { Request, Response } from "express";
import { Login } from "../../application/LoginAuthUseCase";

export class LoginAuthController {
  constructor(readonly loginUseCase: Login) {}

  async run(req: Request, res: Response) {
    const { correo, password } = req.body;
    try {
      const usuario = await this.loginUseCase.run(correo, password);
      if (usuario) {
        res.status(201).json({
          status: "success",
          data: usuario,
        });
      } else {
        res.status(400).json({
          status: "Unauthorized",
          message: "Credenciales incorrectas.",
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
