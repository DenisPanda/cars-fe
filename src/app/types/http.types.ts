import { Vehicle } from "./vehicle.types";

export namespace requestBody {
  export interface Login {
    email: string;
    password: string;
  }

  export interface CreateUser {
    email: string;
    password: string;
  }

  export interface Autocomplete {
    search: string
  }

  export interface CreateVehicle {
    make: string;
    year: number;
    model: string;
  }
}

export namespace responseBody {
  interface BaseResponse<T> {
    message: string;
    data: T;
  }

  interface PaginatedResponse<T> extends BaseResponse<T> {
    pageSize: number;
    page: number;
    count: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }

  export type GetVehicles = PaginatedResponse<Vehicle[]>;

  export interface LoginBody {
    token: string
  }

  export type Login = BaseResponse<LoginBody>;

  export interface CreateUserBody {
    email: string;
    token: string;
  }

  export type CreateUser = BaseResponse<CreateUserBody>;

  export interface CreateVehicleBody extends requestBody.CreateVehicle {
    _id: string;
  }

  export type CreateVehicle = BaseResponse<CreateVehicleBody>;
}
