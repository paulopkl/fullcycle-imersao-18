export class ReservarLugarRequest {
  lugares: string[]; // ["A1", "A2", "A3"]
  tipo_ingresso: "inteira" | "meia";
  email: string;
}
