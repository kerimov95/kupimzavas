import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderDetailsPage } from './order-details.page';
import { DetailProductPageModule } from 'src/app/pages/detail-product/detail-product.module';
import { DetailProductPage } from 'src/app/pages/detail-product/detail-product.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProductPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderDetailsPage],
  entryComponents: [DetailProductPage]
})
export class OrderDetailsPageModule { }
