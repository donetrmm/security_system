import { Usuario } from "./Usuarios";

export interface UsuarioRepository {
  getAll(): Promise<Usuario[] | null>;
  getByCorreo(correo: string): Promise<Usuario | null>;
  createUser(usuario: Usuario): Promise<Usuario | null>;
  updateUser(correo: string, usuario: Usuario): Promise<Usuario | null>;
  deleteUser(correo: string): Promise<Usuario | null>;
}
