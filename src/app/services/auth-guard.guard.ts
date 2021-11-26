import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authService } from './auth.service';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../pages/login/login.page';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private modal: ModalController,
    private auth: authService
  ) {

  }

  async presentModal() {
    const modal = await this.modal.create({
      component: LoginPage,
      swipeToClose: true
    });
    return await modal.present();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let staus = this.auth.checkLogin();
    if (!staus) {
      this.presentModal()
    }
    else
      return true;
  }
}
