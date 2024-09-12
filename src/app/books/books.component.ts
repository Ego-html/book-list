import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Book} from "../models/book.model";

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ]
})

export class BooksComponent implements OnInit {
  books: Book[] = [];
  isEdit = false;
  bookForm!: FormGroup;
  currentBookId: string | null = null;
  isModalOpen = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadBooksFromStorage();
    this.initForm();
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      author: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(0)]],
      title: ['', Validators.required],
      pages: [null, [Validators.required, Validators.min(1)]]
    });
  }

  loadBooksFromStorage(): void {
    const booksData = localStorage.getItem('books');

    if (booksData) {
      this.books = JSON.parse(booksData);
    } else {
      this.books = [];
      this.saveBooksToStorage();
    }
  }

  saveBooksToStorage(): void {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  openAddBookModal(): void {
    this.isEdit = false;
    this.currentBookId = null;
    this.bookForm.reset();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  openEditBookModal(book: Book): void {
    this.isEdit = true;
    this.currentBookId = book.id;
    this.isModalOpen = true;
    this.bookForm.patchValue(book);
  }

  saveBook(): void {
    if (this.bookForm.invalid) return;

    const bookData = this.bookForm.value;

    if (this.isEdit && this.currentBookId) {
      const index = this.books.findIndex(b => b.id === this.currentBookId);
      if (index !== -1) {
        this.books[index] = {...bookData, id: this.currentBookId};
      }
    } else {
      const newBook: Book = {...bookData, id: Date.now().toString()};
      this.books.push(newBook);
    }

    this.saveBooksToStorage();
    this.closeModal();
  }

  onDelete(id: string): void {
    this.books = this.books.filter(book => book.id !== id);
    this.saveBooksToStorage();
  }
}
