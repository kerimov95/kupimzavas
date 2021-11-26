import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { DetailsService } from './details.service';
import { viewOrders, viewOrdersProduct } from 'src/app/models/order';
import { Params } from 'src/app/services/AppConfig';
import { ModalController } from '@ionic/angular';
import { DetailProductPage } from 'src/app/pages/detail-product/detail-product.page';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  public loadStatus: boolean;
  private orderId: number;
  public isDeleted: boolean;

  constructor(
    private modalController: ModalController,
    private app: Params,
    private detailsService: DetailsService,
    private util: UtilitiesService) { }

  ngOnInit() {
    this.orderId = this.util.getValue<number>('orderId').value;
    this.detailsService.getOrder(this.orderId).subscribe();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.loadStatus = true;
    }, 1000);
  }

  ngOnDestroy() {
    this.detailsService.order = null;
  }

  public get StatusLoad(): boolean {
    if (this.loadStatus && !this.util.statusLoad)
      return true;
    else
      return false;
  }

  public get getStatus(): string {
    if (this.detailsService.order)
      return this.util.statusOrder(this.detailsService.order.currentstatus);
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

  public get getProducts(): viewOrdersProduct[] {
    if (this.detailsService.order) {
      if (this.isDeleted)
        return this.detailsService.order.products.sort((a, b) => a.name.localeCompare(b.name));
      else {
        let products = this.detailsService.order.products.filter(r => !r.notAvailable).sort((a, b) => a.name.localeCompare(b.name));
        return products;
      }
    }
  }

  public get getOrder(): viewOrders {
    if (this.detailsService.order)
      return this.detailsService.order
  }

  public PathImage(code: number): string {
    if (code)
      return this.app.baseApiPath + '/image/product?code=' + code;
    else
      return '../../../../../assets/product.png'
  }

  public get TotalProduct(): number {
    let summa = 0;
    if (this.getOrder) {
      summa = this.getOrder.totalPrice - this.getOrder.service.preparation - this.getOrder.service.package - this.getOrder.service.delivery;
    }
    return summa >= 0 ? summa : 0;
  }

  public StatusRow(item: viewOrdersProduct): string {
    if (item.minuscount > 0)
      return 'Кол-во уменьшено на ' + item.minuscount + '/' + item.unit
    else if (item.minuscount < 0)
      return 'Кол-во увеличено на ' + item.minuscount * -1 + '/' + item.unit
  }

  public async cancel() {
    let load = await this.util.presentLoading();
    this.detailsService.cancelOrder(this.orderId).subscribe(_ => { load.dismiss() }, _ => { alert('Не удалось отменить. Заказ уже принят на обработку'), load.dismiss() });
  }

  public async deleteProduct(id: number) {
    let load = await this.util.presentLoading();
    this.detailsService.delete(id).subscribe(_ => { load.dismiss() }, _ => { load.dismiss() });
  }

  public async confirm(id: number) {
    let load = await this.util.presentLoading();
    this.detailsService.confirm(id).subscribe(_ => { load.dismiss() }, _ => { load.dismiss() });
  }
}