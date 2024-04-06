import { Request, Response } from "express";
import { DeleteUsuarioUseCase } from "../../application/DeleteUserUseCase";

export class DeleteUsuarioController {
  constructor(readonly deleteUsuarioUseCase: DeleteUsuarioUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const correo: string = req.params.correo;

    try {
      const deleted = await this.deleteUsuarioUseCase.run(correo);

      if (deleted) {
        res.status(200).json({
          status: "success",
          message: "El usuario se eliminó correctamente.",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "No se encontró el usuario con el ID proporcionado.",
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
