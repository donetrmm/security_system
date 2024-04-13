import { query } from "../../database/mysql";
import { Kit } from "../domain/Kit";
import { KitRepository } from "../domain/KitRepository";

export class MysqlKitRepository implements KitRepository {
  async getAll(idPropietario: string): Promise<Kit[] | null> {
    const sql = "SELECT * FROM kits WHERE idPropietario = ?";
    try {
    const params: any[] = [idPropietario];

      const [data]: any = await query(sql, params);
      const dataKits = Object.values(JSON.parse(JSON.stringify(data)));

      return dataKits.map(
        (kit: any) =>
          new Kit(
            kit.id,
            kit.nombre,
            kit.status,
            kit.alta,
            kit.lugar,
            kit.idPropietario
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getById(kitId: number): Promise<Kit | null> {
    const sql = "SELECT * FROM kits WHERE id=?";
    const params: any[] = [kitId];
    try {
      const [result]: any = await query(sql, params);

      return new Kit(
        result[0].id,
        result[0].nombre,
        result[0].status,
        result[0].alta,
        result[0].lugar,
        result[0].idPropietario
      );
    } catch (error) {
      return null;
    }
  }

  async createKit(kit: Kit): Promise<Kit | null> {
    let createdKit = null;
    const sql = "INSERT INTO kits (id, nombre, status, alta, lugar, idPropietario) VALUES (?, ?, ?, ?, ?, ?)";
    const params: any[] = [kit.id, kit.nombre, kit.status, kit.alta, kit.lugar, kit.idPropietario];
    try {
      const [result]: any = await query(sql, params);
      createdKit = new Kit(
        kit.id,
        kit.nombre,
        kit.status,
        kit.alta,
        kit.lugar,
        kit.idPropietario
      );
    } catch (error) {
      createdKit = null;
    } finally {
      return createdKit;
    }
  }

  async updateKit(kitID: number, kit: Kit): Promise<Kit | null> {
    let updatedKit = null;
    const sql = "UPDATE kits SET id=?, nombre = ?, status = ?, alta = ?, lugar = ?, idPropietario = ? WHERE id = ?";
    const params: any[] = [kit.id, kit.nombre, kit.status, kit.alta, kit.lugar, kit.idPropietario, kitID];
    try {
      await query(sql, params);
      updatedKit = kit;
    } catch (error) {
      updatedKit = null;
    } finally {
      return updatedKit;
    }
  }

  async deleteKit(kitId: number): Promise<Kit | null> {
    let deletedKit = null;
    const sql = "DELETE FROM kits WHERE id = ?";
    const params: any[] = [kitId];
    try {
      const [result]: any = await query(sql, params);
      if (result.affectedRows === 1) {
        deletedKit = new Kit(kitId, '', '', false, '', '');
      }
    } catch (error) {
      deletedKit = null;
    } finally {
      return deletedKit;
    }
  }

  async activarKit(kitId: number,activate: string): Promise<Kit | null> {
    let updatedKit = null;
    const sql = "UPDATE kits SET status = ? WHERE id = ?";
    const params: any[] = [activate, kitId];
    try {
      await query(sql, params);
      updatedKit = await this.getById(kitId);
    } catch (error) {
      updatedKit = null;
    } finally {
      return updatedKit;
    }
  }
}
