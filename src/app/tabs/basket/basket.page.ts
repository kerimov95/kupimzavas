import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { basket, operation } from 'src/app/models/basket';
import { Params } from 'src/app/services/AppConfig';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ModalController, PickerController } from '@ionic/angular';
import { DetailProductPage } from 'src/app/pages/detail-product/detail-product.page';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage {

  constructor(
    private pickerCtrl: PickerController,
    private modalController: ModalController,
    private router: Router,
    private app: Params,
    private basket: BasketService) {
  }

  ngOnInit() {
  }

  public clearBasker() {
    this.basket.clearBasker();
  }

  public async productDetail(id: number) {
    const modal = await this.modalController.create({
      component: DetailProductPage,
      componentProps: {
        id: id,
      },
      swipeToClose: true
    });
    await modal.present();
  }

  public getPrice(id: number) {
    let product = this.basket.basket.poructs.find(r => r.id == id);
    if (product.discount > 0)
      return product.discount;
    else
      return product.price;
  }

  public PathImage(code: number): string {
    if (code)
      return this.app.baseApiPath + '/image/product?code=' + code;
    else
      return '../../../../assets/product.png'
  }

  public getBasket(): basket {
    return this.basket.basket;
  }

  public delete(id: number) {
    this.basket.deleteProduct(id);
  }

  getGram() {
    let options = [];
    options.push({ text: "0 Г.", value: 0 });
    options.push({ text: "10 Г.", value: 10 });
    options.push({ text: "20 Г.", value: 20 });
    options.push({ text: "30 Г.", value: 30 });
    options.push({ text: "40 Г.", value: 40 });
    options.push({ text: "50 Г.", value: 50 });
    options.push({ text: "100 Г.", value: 100 });
    options.push({ text: "200 Г.", value: 200 });
    options.push({ text: "300 Г.", value: 300 });
    options.push({ text: "400 Г.", value: 400 });
    options.push({ text: "500 Г.", value: 500 });
    options.push({ text: "600 Г.", value: 600 });
    options.push({ text: "700 Г.", value: 700 });
    options.push({ text: "800 Г.", value: 800 });
    options.push({ text: "900 Г.", value: 900 });
    return options;
  }

  getKilo() {
    let options = [];
    for (let i = 0; i <= 50; i++)
      options.push({ text: i + " КГ.", value: i });

    return options;
  }

  async openPicker(): Promise<any> {
    const picker = await this.pickerCtrl.create({
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel'
        },
        {
          text: 'Сохранить',
          handler: (value) => {

          }
        }
      ],
      columns: [
        {
          name: 'kilo',
          options: this.getKilo()
        },
        {
          name: 'gram',
          options: this.getGram()
        },
      ]
    });
    await picker.present();
    const { data } = await picker.onWillDismiss();
    return data;
  }

  public addProduct(product: Product) {

    if (product.unit.toUpperCase() == 'КГ') {
      this.openPicker().then(data => {
        if (data) {
          let result = parseFloat(data.kilo.value) + parseFloat((parseFloat(data.gram.value) / 1000).toFixed(2));
          this.basket.editingBasket(product, this.getBasket().storeid, operation.plus, result);
        }
      });
    }
    else if (product.unit.toUpperCase() == 'ШТ')
      this.basket.editingBasket(product, this.getBasket().storeid, operation.plus);
  }

  public removeProduct(product: Product) {
    if (product.unit.toUpperCase() == 'КГ') {
      this.openPicker().then(data => {
        if (data) {
          let result = parseFloat(data.kilo.value) + parseFloat((parseFloat(data.gram.value) / 1000).toFixed(2));
          this.basket.editingBasket(product, this.getBasket().storeid, operation.minus, result);
        }
      });
    }
    else if (product.unit.toUpperCase() == 'ШТ')
      this.basket.editingBasket(product, this.getBasket().storeid, operation.minus);
  }

  public navigate() {
    this.router.navigate(['/home/tabs/basket/check']);
  }

}
