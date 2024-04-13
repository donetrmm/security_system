import { Request, Response } from "express";

import { GetAllReportesUseCase } from "../../application/GetAllReportesUseCase";

export class GetAllReportesController {
  constructor(readonly getAllReportesUseCase: GetAllReportesUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const kitID: number = parseInt(req.params.kitID);
    
    try {
      const reportes = await this.getAllReportesUseCase.run(kitID);
      if (reportes)
        res.status(200).send({
          status: "success",
          data: reportes.map((reportes: any) => {
            return {
              id: reportes.id,
              fecha: reportes.fecha,
              hora: reportes.hora,
              imagen: reportes.imagen,
              idKit: reportes.idKit,
              camara: reportes.camara,
              movimiento: reportes.movimiento,
              magnetico: reportes.magnetico
            };
          }),
        });
      else
        res.status(400).send({
          status: "error",
          msn: "Ocurrio algún problema!",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error!",
        msn: error,
      });
    }
  }
}
