import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BasketPage } from './basket.page';
import { DetailProductPageModule } from 'src/app/pages/detail-product/detail-product.module';
import { DetailProductPage } from 'src/app/pages/detail-product/detail-product.page';

const routes: Routes = [
  {
    path: '',
    component: BasketPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProductPageModule,
    RouterModule.forChild(routes),
  ],
  declarations: [BasketPage],
  entryComponents: [DetailProductPage]
})
export class BasketPageModule { }
