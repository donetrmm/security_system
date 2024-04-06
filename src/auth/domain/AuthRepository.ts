import { Auth } from "./Auth";

export interface AuthRepository {
  login(correo: string): Promise<Auth | null>;
}
