import { CarsSearchForm } from './../../types/cars';
import { Vehicle } from './../../types/vehicle.types';
import { FetchApiService } from './../../services/fetch-api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CarsTableDataSource} from './cars-table-datasource';

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.scss']
})
export class CarsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Vehicle>;
  dataSource: CarsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'make', 'model', 'year'];

  constructor(fAS: FetchApiService) {
    this.dataSource = new CarsTableDataSource(fAS);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  search(data: CarsSearchForm | null) {
    // avoid multiple page loads at component initialization
    if (
      !(
        this.dataSource.searchTerm === null &&
        (data?.search === null || data === null)
      )
    ) {
      this.dataSource.searchTerm = (data && data.search) || null;
      this.dataSource.searchAttribute = (data && data.attribute) || null;

      this.resetParams();
      this.triggerRefresh();
    }
  }

  public triggerRefresh(): void {
    this.dataSource?.triggerRefresh$.next();
  }

  resetPaginator(): void {
    this.paginator.firstPage();
  }

  resetSort() {
    this.sort.sort({
      id: '',
      active: ''
    } as any);
  }

  /**
   * Reset sort && search params
   */
  public resetParams() {
    this.resetSort();
    this.resetPaginator();
  }
}
