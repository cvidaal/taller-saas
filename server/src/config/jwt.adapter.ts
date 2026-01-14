import jwt from "jsonwebtoken";
import { envs } from "./envs";

export class JwtAdapter {
  //1. Generar Token
  public static async generateToken(payload: object, duration: string = "2h") {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_SEED,
        { expiresIn: duration as any },
        (err, token) => {
          if (err) return resolve(null);
          resolve(token);
        }
      );
    });
  }

  //2. Validar Token
  // T. Es un tipo genérico en el que recibimos una caja en la función de usarlo pondremos algo como
  // {id: string, email: string}
  public static async validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
