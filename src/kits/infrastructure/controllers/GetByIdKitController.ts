import { Request, Response } from "express";
import { GetByIdKitUseCase } from "../../application/GetByIdKitUseCase";

export class GetByIdKitController {
  constructor(readonly getByIdKitUseCase: GetByIdKitUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    try {
      const kit = await this.getByIdKitUseCase.run(id);

      if (kit) {
        res.status(200).json({
          status: "success",
          data: {
            id: kit.id,
            name: kit.nombre,
            status: kit.status,
            alta: kit.alta,
            lugar: kit.lugar,
            idPropietario: kit.idPropietario
          },
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
