import { ThrowStmt } from '@angular/compiler';

export class Product {
    id: number;
    name: string;
    full_description: string;
    brand: string;
    price: number;
    discount: number;
    unit: string;
    barcode: number;
    count: number;
    status: number;
    weight: number;
    unittypeweight: string;
    stock: number;
    weightPackage: string;
    currentStatus: boolean;
    get total() {
        return parseFloat((this.count * (this.discount > 0 ? this.discount : this.price)).toFixed(2));
    }
}

export class productDetail {
    id: number;
    code: number;
    name: string;
    unit: string;
    price: number;
    discount: number;
    country: string;
    brand: string;
    supplier: number;
    weightPackage: string;
    ingridients: string;
    nutritionalValue: string;

}