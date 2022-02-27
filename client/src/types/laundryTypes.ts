import { ApiResponse } from "./types";

export interface Laundry {
  id: number;
  name: string;
  address: string;
  phone: string;
  city: string;
  postcode: string;
  admin_id: number | null;
  is_active: boolean;
}
export interface LaundryAllApiResponse extends ApiResponse {
  data: {
    laundries: Laundry[];
  };
}
export interface LaundryAddEditApiRes extends ApiResponse {
  data: {
    laundry: Laundry;
  };
}
export interface Machine {
  id: number;
  size: number;
  number: number;
  laundry_id: number;
}

export interface LaundryGetMachinesApiRes extends ApiResponse {
  data: {
    machines: Machine[];
  };
}
