import { TokenInterceptor } from './interceptors/token.interceptor';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from './shared/layout/layout.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { environment as env } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotLoggedInDialogComponent } from './dialogs/not-logged-in-dialog/not-logged-in-dialog.component';
import { CarFormDialogComponent } from './dialogs/car-form-dialog/car-form-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NotLoggedInDialogComponent,
    CarFormDialogComponent,
  ],
  imports: [
    // initialize firebase
    provideFirebaseApp(() => initializeApp(env.firebaseConfig)),
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
