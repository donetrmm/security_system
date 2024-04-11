import { Kit } from "./Kit";

export interface KitRepository {
  getAll(idPropietario: string): Promise<Kit[] | null>;
  getById(kitId: number): Promise<Kit | null>;
  createKit(kit: Kit): Promise<Kit | null>;
  updateKit(kitId: number, kit: Kit): Promise<Kit | null>;
  deleteKit(kitId: number): Promise<Kit | null>;
  activarKit(kitId: number,activate: string): Promise<Kit | null>;
}
