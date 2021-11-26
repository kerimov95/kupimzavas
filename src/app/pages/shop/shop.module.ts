import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShopPage } from './shop.page';
import { DetailProductPageModule } from '../detail-product/detail-product.module';
import { DetailProductPage } from '../detail-product/detail-product.page';

@NgModule({
  imports: [
    CommonModule,
    DetailProductPageModule
  ],
  declarations: [ShopPage],
  exports: [ShopPage],
  entryComponents: [ShopPage, DetailProductPage]
})
export class ShopPageModule { }
