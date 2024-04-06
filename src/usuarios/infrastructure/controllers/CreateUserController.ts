import { Request, Response } from "express";
import { CreateUsuarioUseCase } from "../../application/CreateUserUseCase";

export class CreateUserController {
  constructor(readonly createUserUseCase: CreateUsuarioUseCase) {}

  async run(req: Request, res: Response) {
    const { correo, password, nombre, apellidos, domicilio, telefono } = req.body;
    try {
      const usuario = await this.createUserUseCase.run(correo, password, nombre, apellidos, domicilio, telefono);
      if (usuario) {
        res.status(201).json({
          status: "success",
          data: usuario,
        });
      } else {
        res.status(204).json({
          status: "error",
          message: "No se pudo crear el usuario.",
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
