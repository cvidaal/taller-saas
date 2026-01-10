import { Response } from "express";

export const handleHttpError = (res: Response, error: any) => {
  console.log(error);

  // P2002: Unique Constraint (Email repetido, Matrícula repetida...)
  if (error.code === "P2002") {
    return res
      .status(409)
      .json({ error: `Unique constraint violation: ${error.meta?.target}` });
  }

  // P2003: Foreign Key (Intentas borrar algo con hijos o asignar un padre que no existe)
  if (error.code === "P2003") {
    return res
      .status(409)
      .json({ error: "Foreign key constraint violation (Check related data)" });
  }

  // P2025: Not Found (Update o Delete de algo que no existe)
  if (error.code === "P2025") {
    return res.status(404).json({ error: "Record not found" });
  }

  // P2023: ID mal formado
  if (error.code === "P2023") {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  // Error genérico
  return res.status(500).json({ error: "Internal Server Error" });
};
