// src/app/models/book.model.ts

export interface Book {
  id: string;       // Уникальный идентификатор книги
  author: string;  // Автор книги
  year: number;    // Год издания книги
  title: string;   // Название книги
  pages: number;
  currentBookId: boolean// Количество страниц
}
