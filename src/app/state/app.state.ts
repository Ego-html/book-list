// src/app/state/app.state.ts

import { Book } from '../models/book.model';

export interface AppState {
  books: Book[];
}
