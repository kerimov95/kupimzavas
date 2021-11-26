import { Component, OnInit, Input } from '@angular/core';
import { productDetail } from 'src/app/models/product';
import { DetailProductService } from './detail-product.service';
import { Params } from 'src/app/services/AppConfig';
import { ModalController } from '@ionic/angular';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

  @Input() public id: number;
  public loadStatus: boolean;
  public title: string;

  constructor(
    private util: UtilitiesService,
    private app: Params,
    private modal: ModalController,
    private detailProductService: DetailProductService
  ) { }

  ngOnInit() {
    this.loadProduct()
  }

  ionViewDidEnter() {
    this.loadStatus = true;
  }

  public get StatusLoad(): boolean {
    if (this.loadStatus && !this.util.statusLoad)
      return true;
    else
      return false;
  }

  public close() {
    this.modal.dismiss();
  }

  public get basePath(): string {
    return this.app.baseApiPath;
  }

  public get getProduct(): productDetail {
    if (this.detailProductService.productDetail)
      return this.detailProductService.productDetail;
  }

  public getPrice() {
    if (this.detailProductService.productDetail.discount > 0)
      return this.detailProductService.productDetail.discount;
    else
      return this.detailProductService.productDetail.price;
  }

  public loadProduct() {
    this.detailProductService.getProduct(this.id)
      .subscribe();
  }

}
