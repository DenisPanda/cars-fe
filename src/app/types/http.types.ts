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

  export interface LoginBody {
    token: string
  }

  export type Login = BaseResponse<LoginBody>;
}
