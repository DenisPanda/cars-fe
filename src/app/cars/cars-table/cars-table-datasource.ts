import { FetchApiService } from './../../services/fetch-api.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, switchMap, tap, debounceTime } from 'rxjs/operators';
import { Observable, of as observableOf, merge, of, Subject } from 'rxjs';
import { Vehicle } from 'src/app/types/vehicle.types';

// TODO: Replace this with your own data model type
// export interface CarsTableItem {
//   _id: string;
//     "make": string;
//     "model": string;
//     "year": number;

// }

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Vehicle[] = [
  {
    "_id": "5ef90c57ca63ea001dc936b6",
    "make": "ACURA",
    "model": "INTEGRA",
    "year": 1987
},
{
    "_id": "5ef900d897e3ca001d4f0659",
    "make": "ACURA",
    "model": "INTEGRA",
    "year": 1994
},
{
    "_id": "5ef8e98614ec08001db6b584",
    "make": "ACURA",
    "model": "CL",
    "year": 1995
},
{
    "_id": "5ef8e98614ec08001db6b57e",
    "make": "ACURA",
    "model": "INTEGRA",
    "year": 1995
},
{
    "_id": "5ef8e98614ec08001db6b590",
    "make": "ACURA",
    "model": "LEGEND",
    "year": 1995
},
{
    "_id": "5ef8e98614ec08001db6b58a",
    "make": "ACURA",
    "model": "NSX",
    "year": 1995
},
{
    "_id": "5ef8e98614ec08001db6b572",
    "make": "ACURA",
    "model": "RL",
    "year": 1995
},
{
    "_id": "5ef8e98614ec08001db6b578",
    "make": "ACURA",
    "model": "TL",
    "year": 1995
},
{
    "_id": "5ef8e9d514ec08001db6d5da",
    "make": "ACURA",
    "model": "CL",
    "year": 1996
},
{
    "_id": "5ef8e9d514ec08001db6d5d4",
    "make": "ACURA",
    "model": "INTEGRA",
    "year": 1996
}
];

/**
 * Data source for the CarsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CarsTableDataSource extends DataSource<Vehicle> {
  data: Vehicle[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private fAS: FetchApiService) {
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
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(switchMap(() => {
          return this.getPagedData();
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData() {
    let sort: string | null = null;
    let sortOrder: 1 | -1 | null = null;

    if (this.sort?.active) {
      sort = this.sort.active;
      sortOrder = this.sort.direction === 'asc' ? 1 : -1;
    }

    if (this.paginator) {
      return this.fAS.getVehicles(this.paginator?.pageIndex + 1, this.paginator.pageSize, sort, sortOrder).pipe(
        debounceTime(20),
        tap(d => {
          (this.paginator as MatPaginator).length = d.count;
        }),
        map(d => d.data)
      )
    } else {
      return of([] as Vehicle[]);
    }
  }
}

