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
  laundryId: number;
}

export interface MachinesApiRes extends ApiResponse {
  data: {
    machines: Machine[];
  };
}
export interface NewMachineApiRes extends ApiResponse {
  data: {
    newMachine: Machine;
  };
}
