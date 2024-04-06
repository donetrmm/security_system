export class Usuario {
  constructor(
    readonly correo: string,
    readonly password: string,
    readonly nombre: string,
    readonly apellidos: string,
    readonly domicilio: string,
    readonly telefono: string
  ) {}
}
