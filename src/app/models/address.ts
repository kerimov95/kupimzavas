import { JsonpInterceptor } from '@angular/common/http';

export class UserAddress {

  constructor(address: string, lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
    this.address = address;
  }

  id: number;
  userid: number;
  address: string;
  is_default: boolean;
  formatted: string;
  lat: number;
  lon: number;
}