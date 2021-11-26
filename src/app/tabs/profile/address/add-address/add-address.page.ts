import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { YandexService } from 'src/app/services/yandex.service';

declare const ymaps: any;

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {


  constructor(
    private modalCtrl: ModalController,
    private yandex: YandexService
  ) { }

  async  ngOnInit() {
    ymaps.ready(this.yandex.initMap('map'))
    this.yandex.FindMe();
  }

  public save() {
    this.modalCtrl.dismiss({ data: this.yandex.currentAddress });
  }

  public async cancel() {
    await this.yandex.destroy();
    this.modalCtrl.dismiss();
  }
}
