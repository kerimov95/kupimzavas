import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  public statusLoad: boolean;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  public setValue<T>(object: storege<T>) {
    localStorage.setItem(object.key, JSON.stringify(object))
  }

  public getValue<T>(key: string): storege<T> {
    return JSON.parse(localStorage.getItem(key));
  }

  public async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Уведомление',
      message: message,
      buttons: ['OK'],
      backdropDismiss: false
    });
    await alert.present();
  }

  public async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Загрузка...'
    });
    await loading.present();
    return loading;
  }

  public statusOrder(id: number): string {
    switch (id) {
      case 0:
        return 'Скомплектован'
      case 1:
        return 'Ожидает обработки'
      case 2:
        return 'На комплектации'
      case 3:
        return 'На подтверждении'
      case 4:
        return 'Подтвержден'
      case 5:
        return 'Готов к отгрузке'
      case 6:
        return 'В пути'
      case 7:
        return 'Доставлен'
      case 8:
        return 'Отменен'
      case 9:
        return 'Идет обработка'
    }
    return
  }

}

export class storege<T> {
  key: string;
  value: T;
}
