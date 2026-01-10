import { hash, compare } from "bcryptjs";

export class BcryptAdapter {
  // Encriptar
  public static hash = async (password: string): Promise<string> => {
    return await hash(password, 10);
  };

  // Comparar para el login
  public static compare = async (
    password: string,
    hashed: string
  ): Promise<boolean> => {
    return await compare(password, hashed);
  };
}
