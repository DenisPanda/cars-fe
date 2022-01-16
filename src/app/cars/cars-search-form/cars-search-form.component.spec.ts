import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsSearchFormComponent } from './cars-search-form.component';
import { MatSelectModule } from '@angular/material/select';

describe('CarsSearchFormComponent', () => {
  let component: CarsSearchFormComponent;
  let fixture: ComponentFixture<CarsSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      declarations: [CarsSearchFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
