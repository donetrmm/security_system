import { Request, Response } from "express";
import { DeleteReporteUseCase } from "../../application/EliminarReporteUseCase";

export class DeleteReporteController {
  constructor(readonly deleteReporteUseCase: DeleteReporteUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const kitId: number = parseInt(req.params.id);

    try {
      const deleted = await this.deleteReporteUseCase.run(kitId);

      if (deleted) {
        res.status(200).json({
          status: "success",
          message: "El kit se eliminó correctamente.",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "No se encontró el reporte con el ID proporcionado.",
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
