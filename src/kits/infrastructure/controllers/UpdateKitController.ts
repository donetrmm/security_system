import { Request, Response } from "express";
import { UpdateKitUseCase } from "../../application/UpdateKitUseCase";

export class UpdateKitController {
  constructor(readonly updateKitUseCase: UpdateKitUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const kitId: number = parseInt(req.params.id);
    const updatedFields = req.body;

    try {
      const updatedKit = await this.updateKitUseCase.run(kitId, updatedFields);

      if (updatedKit) {
        res.status(200).json({
          status: "success",
          data: updatedKit,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "No se encontró el kit con el ID proporcionado o no se pudo actualizar.",
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
