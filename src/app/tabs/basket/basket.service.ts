import { Injectable } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Product } from 'src/app/models/product';
import { basket, operation, servicePrice } from 'src/app/models/basket';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public amount = 0;
  public basket: basket;

  constructor(
    private util: UtilitiesService,
    private api: HttpClient) {
    this.loadBasket();
  }

  public loadBasket() {
    let bas = this.util.getValue<basket>('basket');
    if (bas) {
      this.basket = Object.assign(new basket(), bas.value);
      for (let i = 0; i < bas.value.poructs.length; i++) {
        this.basket.poructs[i] = Object.assign(new Product, bas.value.poructs[i])
      }
    }
  }

  public clearBasker() {
    this.basket = undefined;
    localStorage.removeItem('basket');
  }

  public getTotal(): { delivery: number, package: number, preparation: number, products: number, total: number } {
    if (this.basket && this.basket.poructs.length > 0) {
      let totalProdukt = 0;
      this.basket.poructs.forEach(r => totalProdukt += r.total)
      totalProdukt = Math.round(totalProdukt);
      let Total = totalProdukt + this.basket.servicePrice.delivery + this.basket.servicePrice.package + this.basket.servicePrice.preparation
      return { delivery: this.basket.servicePrice.delivery, package: this.basket.servicePrice.package, preparation: this.basket.servicePrice.preparation, products: totalProdukt, total: Total };
    }
    else
      return null;
  }

  public getAmoutProduct(productId: number): string {
    if (this.basket) {
      let product = this.basket.poructs.find(r => r.id == productId)
      if (product) {
        return product.count + ' ' + product.unit.toLowerCase() + ' / ' + product.total + 'руб';
      }
      else
        return null
    }
    else
      return null;
  }

  private async basketInit(storeId: number): Promise<any> {
    return await this.api.get('/market/store/serviceprice?storeId=' + storeId).toPromise()
  }

  public async editingBasket(product: Product, storeId: number, type: operation, count: number = 0) {

    if (!this.basket && type == operation.plus) {
      let load = await this.util.presentLoading();
      await this.basketInit(storeId)
        .then(
          (data: servicePrice) => {
            this.basket = new basket();
            this.basket.poructs = [];
            this.basket.storeid = storeId;
            this.basket.servicePrice = data
          }).finally(() => load.dismiss())
    }

    if (!this.basket)
      return;

    if (this.basket.storeid != storeId) {
      this.util.presentAlert("Нельзя добавлять товары из разных магазинов. Завершите предыдущий заказ или очистите корзину");
      return;
    }

    let currentProduct = this.basket.poructs.find(r => r.id == product.id);

    switch (type) {
      case operation.plus:
        if (!currentProduct) {
          currentProduct = Object.assign(new Product(), product);
          if (currentProduct.unit == 'ШТ')
            currentProduct.count = 1;
          else if (currentProduct.unit == 'КГ')
            currentProduct.count = count;
          this.basket.poructs.push(currentProduct)
        } else {
          if (currentProduct.unit == 'ШТ')
            currentProduct.count += 1;
          else if (currentProduct.unit == 'КГ')
            currentProduct.count = count;
        }
        break;
      case operation.minus:
        if (currentProduct) {
          if (currentProduct.unit == 'ШТ')
            currentProduct.count -= 1;
          else if (currentProduct.unit == 'КГ')
            currentProduct.count = count;
        }
        break;
    }

    if (currentProduct && currentProduct.count == 0)
      this.basket.poructs = this.basket.poructs.filter(r => r.id != product.id);

    if (this.basket.poructs.length > 0)
      this.util.setValue<basket>({ key: 'basket', value: this.basket });
    else
      this.clearBasker();
  }

  public deleteProduct(id: number) {
    this.basket.poructs = this.basket.poructs.filter(r => r.id != id);
    if (this.basket.poructs.length == 0)
      this.clearBasker();
    else {
      this.util.setValue<basket>({ key: 'basket', value: this.basket });
    }
  }
}
