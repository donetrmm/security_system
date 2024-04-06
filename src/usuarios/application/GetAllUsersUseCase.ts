import { Usuario } from "../domain/Usuarios";
import { UsuarioRepository } from "../domain/UsuariosRepository";

export class GetAllUsuariosUseCase {
  constructor(readonly usuarioRepository: UsuarioRepository) {}

  async run(): Promise<Usuario[] | null> {
    try {
      const result = await this.usuarioRepository.getAll();
      return result;
    } catch (error) {
      return null;
    }
  }
}
