import { Usuario } from "../domain/Usuarios";
import { UsuarioRepository } from "../domain/UsuariosRepository";

export class DeleteUsuarioUseCase {
  constructor(
    readonly usuarioRepository: UsuarioRepository
  ) {}

  async run(correo: string): Promise<boolean> {
    try {
      const existingUser = await this.usuarioRepository.getByCorreo(correo);
      if (!existingUser) {
        return false;
      }

      await this.usuarioRepository.deleteUser(correo);

      return true;
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      return false;
    }
  }
}
