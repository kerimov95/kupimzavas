import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckoutPage } from './checkout.page';
import { AddressPageModule } from '../../profile/address/address.module';
import { AddressPage } from '../../profile/address/address.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CheckoutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AddressPageModule
  ],
  declarations: [CheckoutPage],
  entryComponents: [
    AddressPage
  ]
})
export class CheckoutPageModule { }
