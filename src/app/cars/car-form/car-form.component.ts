import { UiService } from './../../services/ui.service';
import { FetchApiService } from './../../services/fetch-api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { capitalize as _capitalize } from 'lodash-es';
import { getYear } from 'date-fns';
import { Subject } from 'rxjs';

const FIELD_MIN_LEN = 1;

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  @ViewChild('submitBtn', { static: true }) submitBtn!: ElementRef<HTMLButtonElement>;
  form!: FormGroup;
  errorMessages: string[] = [];

  public submitSuccess$ = new Subject<void>();

  constructor(private fb: FormBuilder, private fAS: FetchApiService, private uiS: UiService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      make: [null, [Validators.required, Validators.minLength(1)]],
      model: [null, [Validators.required, Validators.minLength(1)]],
      year: [getYear(new Date()), [Validators.required]],
    });
  }

  onSubmit(): void {
    this.clearErrorMessages();

    if (this.form.valid) {
      this.fAS.createVehicle(this.form.value).subscribe({
        next: (_) => {
          this.uiS.snack('Car was added successfully')

          this.submitSuccess$.next();
        },
        error: (err) => {
          console.error('Login error:', err);

          if (err) {
            if (err.status === 400) {
              this.setErrorMessages(['Server responded: "Bad payload".']);
            }

            if (err.status === 409) {
              this.setErrorMessages(['Server responded: "Duplicate error. Vehicle already exists".']);
            }
          }
        }
      });
    } else {
      console.info('Form invalid');
      this.setErrorMessages();
      this.uiS.snack('Submit failed.');
    }
  }

  submitForm(): void {
    // trigger submit event so the submit event get propagated properly
    this.submitBtn.nativeElement.click();
  }

  clearErrorMessages(): void {
    if (this.errorMessages.length) {
      this.errorMessages = [];
    }
  }

  setErrorMessages(remoteErrors: string[] = []): void {
    // SET LOCAL ERRORS
    // go trough every form control and attach appropriate error msg
    Object.entries(this.form.controls).forEach(([fieldKey, fc]) => {
      if (!fc.valid && fc.errors) {
        Object.entries(fc.errors).forEach(([errType, val]) => {
          if (val) {
            let errMsg = '';
            // one name field names so this solution works
            let fieldName = _capitalize(fieldKey);

            switch (errType) {
              case 'required':
                errMsg = `${fieldName} field is required.`;
                break;

              case 'email':
                errMsg = `Please enter a valid email.`;
                break;

              case 'minlength':
                errMsg = `${fieldName} minimal required character length is ${FIELD_MIN_LEN}.`;
                break;

              default:
                errMsg = 'Unknown field error.';
                break;
            }

            this.errorMessages = [...this.errorMessages, errMsg];
          }
        });
      }
    });

    // SET REMOTE ERRORS
    this.errorMessages = [...this.errorMessages, ...remoteErrors];
  }
}
