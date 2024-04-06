import { Usuario } from "../domain/Usuarios";
import { UsuarioRepository } from "../domain/UsuariosRepository";

export class UpdateUsuarioUseCase {
  constructor(
    readonly usuarioRepository: UsuarioRepository
  ) {}

  async run(correo: string, updatedFields: Partial<Usuario>): Promise<Usuario | null> {
    try {
      const existingUser = await this.usuarioRepository.getByCorreo(correo);
      if (!existingUser) {
        return null;
      }

      const updatedUser: Usuario = {
        ...existingUser,
        ...updatedFields,
      };

      const savedUser = await this.usuarioRepository.updateUser( correo, updatedUser );

      return savedUser;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return null;
    }
  }
}
