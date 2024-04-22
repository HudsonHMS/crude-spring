import { Aula } from "./aula";

export interface Cursos {
  id?: number | null;
  nome: string;
  valor: number | null;
  categoria?: string
  aulas?: Aula[];
}
