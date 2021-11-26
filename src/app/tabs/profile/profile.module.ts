import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';
import { AddressPage } from './address/address.page';
import { AddressPageModule } from './address/address.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
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
  declarations: [ProfilePage],
  entryComponents: [
    AddressPage
  ]
})
export class ProfilePageModule { }
