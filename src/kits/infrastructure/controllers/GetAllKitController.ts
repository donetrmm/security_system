import { Request, Response } from "express";
import { GetAllKitUseCase } from "../../application/GetAllKitUseCase";

export class GetAllKitController {
  constructor(readonly getAllKitUseCase: GetAllKitUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const kits = await this.getAllKitUseCase.run();
      
      if (kits) {
        res.status(200).json({
          status: "success",
          data: kits.map((kit) => ({
            id: kit.id,
            name: kit.nombre,
            status: kit.status,
            alta: kit.alta,
            lugar: kit.lugar,
            idPropietario: kit.idPropietario
          })),
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "No se encontraron kits.",
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
