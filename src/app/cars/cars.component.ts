import { CarsSearchFormComponent } from './cars-search-form/cars-search-form.component';
import { CarsTableComponent } from './cars-table/cars-table.component';
import { CarFormDialogComponent } from './../dialogs/car-form-dialog/car-form-dialog.component';
import { AuthService } from './../services/auth.service';
import { Component, Injector, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotLoggedInDialogComponent } from '../dialogs/not-logged-in-dialog/not-logged-in-dialog.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent {
  @ViewChild('table', { static: true }) table!: CarsTableComponent;
  @ViewChild('carForm', { static: true })
  carsSearchForm!: CarsSearchFormComponent;

  constructor(
    private authS: AuthService,
    private dialog: MatDialog,
    private injector: Injector
  ) {}

  /**
   * Resets sort and filter data && refreshes table
   */
  resetFiltersAndSort(): void {
    this.carsSearchForm.resetForm();
    this.table.resetParams();
    this.table.triggerRefresh();
  }

  /**
   * Opens add car form dialog or please login dialog
   */
  addCarHandler(): void {
    if (this.authS.loggedIn) {
      const dI = this.dialog.open(CarFormDialogComponent, {
        data: { parentInjector: this.injector },
      });

      dI.afterClosed().subscribe((refreshTable) => {
        if (refreshTable) {
          this.resetFiltersAndSort();
        }
      });

      return;
    }
    this.dialog.open(NotLoggedInDialogComponent);
  }
}
