import type { ListDocument } from "./List";

export interface BoardDocument extends Document {
  name: string;
  lists: string[] | ListDocument[];
  owner: string;
  coverImage: string;
}

