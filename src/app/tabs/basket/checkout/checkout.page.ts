import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { AddressPage } from '../../profile/address/address.page';
import { UserAddress } from 'src/app/models/address';
import { ModalController } from '@ionic/angular';
import { Deliverytype, typeagreement, viewOrders } from 'src/app/models/order';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { BasketService } from '../basket.service';
import { Location } from '@angular/common';
import { OrderService } from '../../orders/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  public currenDelivery: number;
  public currentAgreementParent: number;
  public currentAgreementChild: number;
  public statusLoad: boolean;

  constructor(
    private orderService: OrderService,
    private location: Location,
    private basketService: BasketService,
    private util: UtilitiesService,
    private checkoutService: CheckoutService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.checkoutService.getDefaultAddress().subscribe();
    this.checkoutService.getPeriod().subscribe()
    this.checkoutService.getAgreements().subscribe()
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.statusLoad = true;
    }, 1000);
  }

  public get timeStatus(): boolean {
    if (this.checkoutService.delivery && this.checkoutService.delivery.length > 0)
      return true;
    else
      return false;
  }

  public set setCurrentAddress(address: UserAddress) {
    this.checkoutService.currentAddress = address;
  }

  public get getCurrentAddress(): UserAddress {
    if (this.checkoutService.currentAddress)
      return this.checkoutService.currentAddress;
  }

  public get getDeliveryType(): Deliverytype[] {
    if (this.checkoutService.delivery)
      return this.checkoutService.delivery;
  }

  public get getAgreementParent(): typeagreement[] {
    if (this.checkoutService.typeagreement)
      return this.checkoutService.typeagreement.filter(r => r.parent == 0)
  }

  public get getAgreementChild(): typeagreement[] {
    if (this.checkoutService.typeagreement && this.currentAgreementParent)
      return this.checkoutService.typeagreement.filter(r => r.parent == this.currentAgreementParent)
  }

  public async selectAddress() {
    const modal = await this.modal.create({
      component: AddressPage,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data)
      this.setCurrentAddress = data.address;
  }

  public async save() {
    let load = await this.util.presentLoading();
    if (this.getCurrentAddress && this.currenDelivery && this.currentAgreementParent) {
      let AgreementType;
      if (this.getAgreementChild.length > 0 && this.currentAgreementChild)
        AgreementType = this.currentAgreementChild
      else AgreementType = this.currentAgreementParent;

      await this.checkoutService.createOrder(this.getCurrentAddress.id, this.currenDelivery, AgreementType)
        .then(data => {

          if (data.status) {
            if (this.orderService.orders)
              this.orderService.orders.push(data.order);
            this.basketService.clearBasker();
            this.location.back();
          }
          else if (!data.status) {
            data.orders.forEach(item => {
              this.basketService.basket.poructs.find(p => p.id == item.id).currentStatus = true;
            });
            this.location.back();
            alert('Некоторые товары закончились. Для продолжения удалите их из заказа')
          }
        })
        .finally(() => { load.dismiss() });
    }
  }
}
