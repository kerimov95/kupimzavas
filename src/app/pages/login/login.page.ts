import { Component } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { authService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { Plugins } from "@capacitor/core";
const { PushNotifications } = Plugins;
import { FCM } from "capacitor-fcm";
const fcm = new FCM();

export interface ResponseData {
  access_token: string;
  login: string;
  name: string;
}

export class Login {
  login: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public errorMessage: string;
  public login: string;
  public password: string;
  public validLogin: boolean;

  constructor(
    private util: UtilitiesService,
    private modal: ModalController,
    private auth: authService) { }

  ngOnInit() {
  }

  public change(value: boolean) {
    this.validLogin = !value;
  }

  public cancel() {
    this.modal.dismiss();
  }

  public loginIn() {
    this.auth.inLogin(this.login, this.password)
      .subscribe(() => {
        PushNotifications.requestPermission().then(result => {
          if (result.granted) {
            PushNotifications.register().then(() => {
              fcm
                .subscribeTo({ topic: this.login });
            }).catch(err => alert(JSON.stringify(err)));
          }
        });
        this.modal.dismiss();
      }, err => {
        this.errorMessage = 'Проверьте логин и пароль'
      })
  }


  public async replacePassword(value: boolean) {
    this.validLogin = !value;
    if (value) {
      let loading = await this.util.presentLoading();
      this.auth.getcode(this.login)
        .subscribe(() => {
          this.util.presentAlert('Ваш пароль отправлен на номер ' + this.login)
          loading.dismiss();
        }
          , () => {
            this.util.presentAlert('Не удалось восстановить пароль')
            loading.dismiss();
          })
    }
    else {
      this.util.presentAlert('Укажите номер телефона')
    }
  }
}