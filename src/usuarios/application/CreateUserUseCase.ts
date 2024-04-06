import { Usuario } from "../domain/Usuarios";
import { UsuarioRepository } from "../domain/UsuariosRepository";
import { IEcryptService } from "./Services/IEncryptService";


export class CreateUsuarioUseCase {
  constructor(
    readonly usuarioRepository: UsuarioRepository,
    readonly encryptPassword: IEcryptService,
  ) {}

  async run(
    correo: string,
    password: string,
    nombre: string,
    apellidos: string,
    domicilio: string,
    telefono: string
  ): Promise<Usuario | null> {
    const encode = this.encryptPassword.encodePassword(password);
    const usuario = new Usuario(correo, encode, nombre, apellidos, domicilio, telefono);
    try {
      const pay = await this.usuarioRepository.createUser(usuario);

      return pay;
    } catch (error) {
      return null;
    } 
  }
}
