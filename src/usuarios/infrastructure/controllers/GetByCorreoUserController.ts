import { Request, Response } from "express";
import { GetByCorreoUsuarioUseCase } from "../../application/GetByCorreoUserUseCase";

export class GetByCorreoUserController {
  constructor(readonly getByCorreoUseCase: GetByCorreoUsuarioUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const correo: string = req.params.correo;
    try {
      const usuario = await this.getByCorreoUseCase.run(correo);

      if (usuario) {
        res.status(200).json({
          status: "success",
          data: {
            correo: usuario.correo,
            password: usuario.password,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            domicilio: usuario.domicilio,
            telefono: usuario.telefono
          },
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "No se encontró el usuario con el correo proporcionado.",
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
