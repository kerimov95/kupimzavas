import { Product } from './product';

export class basket {
    public storeid: number;
    public poructs: Product[];
    public servicePrice: servicePrice;
}

export class servicePrice {
    id: number;
    delivery: number;
    package: number;
    preparation: number;
}

export enum operation {
    plus,
    minus
}