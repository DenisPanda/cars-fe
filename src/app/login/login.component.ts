import { FetchApiService } from './../services/fetch-api.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { capitalize as _capitalize } from 'lodash-es';
import { UiService } from '../services/ui.service';

const FIELD_MIN_LEN = 8;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private uiS: UiService,
    private fAS: FetchApiService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        // usually min len isn't required on login fields
        // but this is here for demonstration purpose
        [Validators.required, Validators.minLength(FIELD_MIN_LEN)],
      ],
    });
  }

  formSubmit(): void {
    this.clearErrorMessages();

    console.log('Submit', this.form);
    if (this.form.valid) {
      this.fAS.login(this.form.value).subscribe({
        next: () => {},
      });

      console.log('Form valid');
    } else {
      console.info('Form invalid');
      this.setErrorMessages();
      this.uiS.snack('Submit failed.');
    }
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
                errMsg = `${fieldName} minimal required character length is ${FIELD_MIN_LEN}`;
                break;

              default:
                errMsg = 'Unknown field error';
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
