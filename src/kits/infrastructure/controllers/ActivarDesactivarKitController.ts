import { Request, Response } from "express";
import { ActivateKitUseCase } from "../../application/ActivarDesactivarKitUseCase";

export class ActivateKitController {
  constructor(readonly activateKitUseCase: ActivateKitUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const kitId: number = parseInt(req.params.id);
    const activate: string = req.body.activate;

    try {
      const kit = await this.activateKitUseCase.run(kitId, activate);

      if (kit) {
        res.status(200).json({
          status: "success",
          data: kit,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "No se encontró el kit con el ID proporcionado.",
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
