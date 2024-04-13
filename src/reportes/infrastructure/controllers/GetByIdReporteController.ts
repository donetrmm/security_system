import { Request, Response } from "express";

import { GetByIdReportesUseCase } from "../../application/GetByIdReportesUseCase";

export class GetByIdReportesController {
  constructor(readonly getByIdReportesUseCase: GetByIdReportesUseCase) {}

  async run(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    try {
      const reporte = await this.getByIdReportesUseCase.run(id);

      if (reporte)
        res.status(200).send({
          status: "success",
          data: {
            id: reporte.id,
            fecha: reporte.fecha,
            hora: reporte.hora,
            imagen: reporte.imagen,
            idKit: reporte.idKit,
            camara: reporte.camara,
            movimiento: reporte.movimiento,
            magnetico: reporte.magnetico
          },
        });
      else
        res.status(400).send({
          status: "Not Found",
          msn: "No hay reportes en la base de datos",
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
