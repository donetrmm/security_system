import { query } from "../../database/mysql";
import { Auth } from "../domain/Auth";
import { AuthRepository } from "../domain/AuthRepository";

export class MysqlAuthRepository implements AuthRepository {

  async login(correo: string): Promise<Auth | null> {
    const sql = "SELECT * FROM Usuarios WHERE correo = ?";
    const params: any[] = [correo];
    try {
        const [result]: any = await query(sql, params);
        if (result.length > 0) {
            const userData = result[0];
            return new Auth(
                userData.correo,
                userData.password,
            );
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al ejecutar la consulta SQL:", error);
        return null;
    }
}

}
