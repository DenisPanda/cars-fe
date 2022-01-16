import { CarsSearchForm } from './../../types/cars';
import { debounceTime, map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CarsSearchAttribute } from 'src/app/types/cars';

/**
 * Default search attribute
 */
const DEF_ATTR: CarsSearchAttribute = 'make';
/**
 * Debounce time value
 */
const DEB_VAL = 1000;

@Component({
  selector: 'app-cars-search-form',
  templateUrl: './cars-search-form.component.html',
  styleUrls: ['./cars-search-form.component.scss'],
})
export class CarsSearchFormComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  private searchEvent$$ = new BehaviorSubject<CarsSearchForm | null>(null);

  @Output() searchEvent$ = this.searchEvent$$.pipe(debounceTime(DEB_VAL));

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();

    // expose form change event
    this._subs.push(
      this.form.valueChanges
        .pipe(
          map((val) => {
            this.searchEvent$$.next(val as CarsSearchForm);
          })
        )
        .subscribe()
    );
  }

  initForm(): void {
    this.form = this.fb.group({
      search: [null],
      attribute: [DEF_ATTR],
    });
  }

  public resetForm(): void {
    this.form.setValue({
      search: null,
      attribute: DEF_ATTR
    })
  }

  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }
}
