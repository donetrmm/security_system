export class Kit {
  constructor(
    readonly id: number,
    readonly nombre: string,
    readonly status: string,
    readonly alta: boolean,
    readonly lugar: string,
    readonly idPropietario: string
  ) {}
}
