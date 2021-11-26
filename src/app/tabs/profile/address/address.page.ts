import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddAddressPage } from './add-address/add-address.page';
import { AddressService } from './address.service';
import { ProfileService } from '../profile.service';
import { UserAddress } from 'src/app/models/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private addressService: AddressService,
    private prof: ProfileService
  ) { }

  ngOnInit() {
    this.addressService.getAddresses().subscribe();
  }

  public getAddresses(): UserAddress[] {
    return this.addressService.adresses;
  }

  public async addAddress() {
    const modal = await this.modalController.create({
      component: AddAddressPage,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data)
      this.addressService.addAddress(data.data).subscribe();
  }

  public deleteAddre(address: UserAddress) {
    if (address.is_default && this.prof.user)
      this.prof.user.address = null;
    this.addressService.deleteAddress(address.id).subscribe();
  }

  public clickAddress(address: UserAddress) {
    this.modalController.dismiss({
      address: address
    });
  }

  public cancel() {
    this.modalController.dismiss();
  }

}
