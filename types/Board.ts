import type { ListDocument } from "./List";

export interface BoardDocument {
  id: number;
  name: string | undefined;
  cards?: string[] | ListDocument[];
}

