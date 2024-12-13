import type { ListDocument } from "./List";

export interface BoardDocument {
  id: string;
  name: string;
  cards?: string[] | ListDocument[];
  // coverImage: string;
}

