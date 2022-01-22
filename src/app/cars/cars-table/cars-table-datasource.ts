import { UiService } from './../../services/ui.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FetchApiService } from './../../services/fetch-api.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { skip, map, switchMap, tap, debounceTime } from 'rxjs/operators';
import {
  Observable,
  of as observableOf,
  merge,
  Subject,
  catchError,
  throwError,
} from 'rxjs';
import { Vehicle } from 'src/app/types/vehicle.types';
import { CarsSearchAttribute } from 'src/app/types/cars';

const DEBOUNCE_VAL = 500;

export class CarsTableDataSource extends DataSource<Vehicle> {
  data: Vehicle[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  triggerRefresh$ = new Subject<void>();

  searchAttribute: CarsSearchAttribute | null = null;
  searchTerm: string | null = null;

  constructor(
    private fAS: FetchApiService,
    private spinner: NgxSpinnerService,
    private uiS: UiService
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Vehicle[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        this.triggerRefresh$.pipe(skip(1)),
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        debounceTime(DEBOUNCE_VAL),
        switchMap(() => {
          return this.getPagedData();
        }),
        tap(() => {
          this.spinner.hide('table');
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  private getPagedData() {
    let sort: string | null = null;
    let sortOrder: 1 | -1 | null = null;

    this.spinner.show('table');

    if (this.sort?.active && this.sort?.direction) {
      sort = this.sort.active;
      sortOrder = this.sort.direction === 'asc' ? 1 : -1;
    }

    if (this.paginator) {
      return this.fAS
        .getVehicles(
          this.paginator?.pageIndex + 1,
          this.paginator.pageSize,
          sort,
          sortOrder,
          this.searchTerm,
          this.searchAttribute
        )
        .pipe(
          tap((d) => {
            (this.paginator as MatPaginator).length = d.count;
          }),
          map((d) => d.data),
          catchError((err) => {
            console.error('Table loading error:', err);
            this.uiS.snack('Error while loading table data.');

            this.spinner.hide('table');

            return throwError(() => new Error(err));
          })
        );
    } else {
      return observableOf([] as Vehicle[]);
    }
  }
}
