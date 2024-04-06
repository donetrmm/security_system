import { Request, Response } from "express";
import { UpdateUsuarioUseCase } from "../../application/UpdateUserUseCase";

export class UpdateUserController {
  constructor(readonly updateUserUseCase: UpdateUsuarioUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const correo: string = req.params.correo;
    const updatedFields = req.body;

    try {
      const updatedUser = await this.updateUserUseCase.run(correo, updatedFields);

      if (updatedUser) {
        res.status(200).json({
          status: "success",
          data: updatedUser,
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
