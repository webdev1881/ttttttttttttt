export interface ListDocument extends Document {
  name: string;
  cards: string[];
  board: string;
  owner: string;
}

