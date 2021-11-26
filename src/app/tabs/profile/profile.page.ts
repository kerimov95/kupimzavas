import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressPage } from './address/address.page';
import { ProfileService } from './profile.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Router } from '@angular/router';
import { Plugins } from "@capacitor/core";
const { PushNotifications } = Plugins;
import { FCM } from "capacitor-fcm";
const fcm = new FCM();
const { FCMPlugin } = Plugins;



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public loadStatus = false;

  constructor(
    private modalController: ModalController,
    private prof: ProfileService,
    private util: UtilitiesService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.prof.getProfile().subscribe()
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.loadStatus = true;
    }, 1000);
  }

  public get StatusLoad(): boolean {
    if (this.loadStatus && !this.util.statusLoad)
      return true;
    else
      return false;
  }

  public async out() {
    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        PushNotifications.register().then(() => {
          fcm
            .unsubscribeFrom({ topic: this.prof.user.phone.substr(2, 10) });
        }).catch(err => alert(JSON.stringify(err)));
      }
    });
    localStorage.removeItem('token');
    this.router.navigate([''])
  }

  public async editProfile() {
    let load = await this.util.presentLoading();
    this.prof.editProfile().subscribe(
      () => {
        load.dismiss();
        this.util.presentAlert('Изменения успешно сохранены');
      }
    );
  }

  public async address() {
    const modal = await this.modalController.create({
      component: AddressPage,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data)
      this.prof.setDefaultAddress(data.address).subscribe()
  }

  public doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
}
