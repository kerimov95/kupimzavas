import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalePageRoutingModule } from './sale-routing.module';

import { SalePage } from './sale.page';
import { ShopPageModule } from 'src/app/pages/shop/shop.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalePageRoutingModule,
    ShopPageModule
  ],
  declarations: [SalePage]
})
export class SalePageModule { }
