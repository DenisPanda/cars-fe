import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private _sB: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      'email': [null, [ Validators.required, Validators.email ] ],
      'password': [null, [ Validators.required, Validators.minLength(8)]]
    });
  }

  formSubmit(): void {
    console.log('Submit')
    this._sB.open("Error", 'OK', {duration: 10000, panelClass: 'snack-danger'});
    if(this.form.valid) {
      console.log('Form valid')
    } else {
      console.info('Form invalid');
    }
  }
}
