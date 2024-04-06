import { Usuario } from "../domain/Usuarios";
import { UsuarioRepository } from "../domain/UsuariosRepository";

export class GetByCorreoUsuarioUseCase {
  constructor(readonly usuarioRepository: UsuarioRepository) {}

  async run(correo: string): Promise<Usuario | null> {
    try {
      const result = await this.usuarioRepository.getByCorreo(correo);
      return result;
    } catch (error) {
      return null;
    }
  }
}
