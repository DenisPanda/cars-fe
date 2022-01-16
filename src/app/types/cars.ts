export type CarsSearchAttribute = 'make' | 'year' | 'model';

export interface CarsSearchForm {
  search: string | null;
  attribute: CarsSearchAttribute
}
