import { query } from "../../database/mysql";
import { Usuario } from "../domain/Usuarios";
import { UsuarioRepository } from "../domain/UsuariosRepository";

export class MysqlUsuarioRepository implements UsuarioRepository {
  async getAll(): Promise<Usuario[] | null> {
    const sql = "SELECT * FROM usuarios";
    try {
      const [data]: any = await query(sql, []);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));

      return dataUsers.map(
        (user: any) =>
          new Usuario(
            user.correo,
            user.password,
            user.nombre,
            user.apellidos,
            user.domicilio,
            user.telefono
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getByCorreo(correo: string): Promise<Usuario | null> {
    const sql = "SELECT * FROM usuarios WHERE correo = ?";
    const params: any[] = [correo];
    try {
        const [result]: any = await query(sql, params);
        if (result.length > 0) {
            const userData = result[0];
            return new Usuario(
                userData.correo,
                userData.password,
                userData.nombre,
                userData.apellidos,
                userData.domicilio,
                userData.telefono
            );
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al ejecutar la consulta SQL:", error);
        return null;
    }
}

  async createUser(user: Usuario): Promise<Usuario | null> {
    let createdUser = null;
    const sql = "INSERT INTO usuarios (correo, password, nombre, apellidos, domicilio, telefono) VALUES (?, ?, ?, ?, ?, ?)";
    const params: any[] = [user.correo, user.password, user.nombre, user.apellidos, user.domicilio, user.telefono];
    try {
      const [result]: any = await query(sql, params);
      createdUser = new Usuario(
        user.correo,
        user.password,
        user.nombre,
        user.apellidos,
        user.domicilio,
        user.telefono
      );
    } catch (error) {
      createdUser = null;
    } finally {
      return createdUser;
    }
  }

  async updateUser(correo: string, user: Usuario): Promise<Usuario | null> {
    let updatedUser = null;
    const sql = "UPDATE usuarios SET id=?, nombre = ?, status = ?, alta = ?, lugar = ?, idPropietario = ? WHERE correo = ?";
    const params: any[] = [user.correo, user.password, user.nombre, user.apellidos, user.domicilio, user.telefono, correo];
    try {
      await query(sql, params);
      updatedUser = user;
    } catch (error) {
      updatedUser = null;
    } finally {
      return updatedUser;
    }
  }

  async deleteUser(correo: string): Promise<Usuario | null> {
    let deletedUser = null;
    const sql = "DELETE FROM usuarios WHERE correo = ?";
    const params: any[] = [correo];
    try {
      const [result]: any = await query(sql, params);
      if (result.affectedRows === 1) {
        deletedUser = new Usuario(correo, '', '', '', '', '');
      }
    } catch (error) {
      deletedUser = null;
    } finally {
      return deletedUser;
    }
  }
}
