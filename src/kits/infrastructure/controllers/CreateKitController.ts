import { Request, Response } from "express";
import { CreateKitUseCase } from "../../application/CreateKitUseCase";

export class CreateKitController {
  constructor(readonly createKitUseCase: CreateKitUseCase) {}

  async run(req: Request, res: Response) {
    const { id, nombre, status, alta, lugar, idPropietario } = req.body;
    try {
      const kit = await this.createKitUseCase.run(id, nombre, status, alta, lugar, idPropietario);
      if (kit) {
        res.status(201).json({
          status: "success",
          data: kit,
        });
      } else {
        res.status(204).json({
          status: "error",
          message: "No se pudo crear el kit.",
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
