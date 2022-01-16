import { Component, ComponentRef, ViewChild, ViewContainerRef, OnInit, Injector, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CarFormComponent } from 'src/app/cars/car-form/car-form.component';

interface DialogData {
  parentInjector: Injector
}

@Component({
  selector: 'app-car-form-dialog',
  templateUrl: './car-form-dialog.component.html',
  styleUrls: ['./car-form-dialog.component.scss'],
})
export class CarFormDialogComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  componentRef!: ComponentRef<CarFormComponent>;
  @ViewChild('form', {read: ViewContainerRef, static: true}) formVc!: ViewContainerRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<CarFormDialogComponent>,
    public injector: Injector,
  ) {
  }

  ngOnInit(): void {
    this.initializeFormComponent();

    this._subs.push(
      this.componentRef.instance.submitSuccess$.subscribe(() =>
        this.close(true)
      )
    );
  }

  submitForm(): void {
    this.componentRef.instance.submitForm();
  }

  initializeFormComponent(): void {
    this.componentRef = this.formVc.createComponent(CarFormComponent, {
      'injector': this.data.parentInjector
    });
  }

  close(refreshTable = false) {
    this.dialogRef.close(refreshTable);
  }

  ngOnDestroy(): void {
    this._subs.forEach(s => s.unsubscribe());
  }
}
