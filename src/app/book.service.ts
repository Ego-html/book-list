// src/app/books/book.service.ts
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Book } from './models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private storageKey = 'books';

  getBooks(): Observable<Book[]> {
    const books = localStorage.getItem(this.storageKey);
    return of(books ? JSON.parse(books) : []);
  }

  saveBooks(books: Book[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(books));
  }
}
