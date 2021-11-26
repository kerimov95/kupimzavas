import { servicePrice } from './basket';

export class Deliverytype {
    id: number;
    from: string;
    before: string;
    active: boolean;
}

export class typeagreement {
    id: number;
    name: string;
    parent: number;
}

export class order {
    id: number;
    addressid: number;
    deliverytypeid: number;
    typeagreementid: number;
    storeid: number;
    servicepriceid: number;
    nomenclaturefororders: nomenclaturefororders[]
}

export class nomenclaturefororders {
    initcount: number;
    nomenclatureforstoreid: number;
    confirm: boolean;
}

export class viewOrders {
    id: number;
    currentstatus: number;
    date: Date;
    storename: string;
    totalPrice: number;
    delivery: string;
    address: string;
    service: servicePrice;
    status: boolean;
    products: viewOrdersProduct[]
}

export class viewOrdersProduct {
    id: number;
    nomForOrder: number;
    beforeId: number;
    confirm: boolean;
    deleted: boolean;
    ismarked: boolean;
    notAvailable: boolean;
    name: string;
    code: number;
    price: number;
    minuscount: number;
    initcount: number;
    total: number;
    unit: string;

}