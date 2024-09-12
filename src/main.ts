// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {AppComponent} from "./app/app.component";

bootstrapApplication (AppComponent, {
  providers: [
    provideRouter([]),
    provideHttpClient()
  ]
});
