import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarFormComponent } from './car-form/car-form.component';
import { CarsComponent } from './cars.component';


@NgModule({
  declarations: [
    CarFormComponent,
    CarsComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule
  ]
})
export class CarsModule { }
