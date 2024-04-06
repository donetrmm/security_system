import { Request, Response } from "express";
import { GetAllUsuariosUseCase } from "../../application/GetAllUsersUseCase";

export class GetAllUsersController {
  constructor(readonly getAllUsuariosUseCase: GetAllUsuariosUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.getAllUsuariosUseCase.run();
      
      if (usuarios) {
        res.status(200).json({
          status: "success",
          data: usuarios.map((usuario) => ({
            correo: usuario.correo,
            password: usuario.password,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            domicilio: usuario.domicilio,
            telefono: usuario.telefono
          })),
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "No se encontraron usuarios.",
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
