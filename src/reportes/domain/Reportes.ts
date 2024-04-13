export class Reportes {
  constructor(
    readonly id: number,
    readonly fecha: Date,
    readonly hora: string,
    readonly imagen: string,
    readonly idKit: number,
    readonly camara: boolean,
    readonly movimiento: boolean,
    readonly magnetico: boolean
  ) {}
}
