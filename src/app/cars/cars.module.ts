import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarFormComponent } from './car-form/car-form.component';
import { CarsComponent } from './cars.component';
import { CarsTableComponent } from './cars-table/cars-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    CarFormComponent,
    CarsComponent,
    CarsTableComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class CarsModule { }
