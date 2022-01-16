import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-logged-in-dialog',
  templateUrl: './not-logged-in-dialog.component.html',
  styleUrls: ['./not-logged-in-dialog.component.scss'],
})
export class NotLoggedInDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NotLoggedInDialogComponent>,
    private router: Router
  ) {}

  goToLogin(): void {
    this.router.navigate(['/', 'login']);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
