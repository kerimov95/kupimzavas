import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddressPage } from './address.page';
import { AddAddressPage } from './add-address/add-address.page';
import { AddAddressPageModule } from './add-address/add-address.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAddressPageModule
  ],
  declarations: [AddressPage],
  entryComponents: [
    AddAddressPage
  ]
})
export class AddressPageModule { }
