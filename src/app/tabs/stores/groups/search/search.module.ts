import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPage } from './search.page';
import { DetailProductPageModule } from '../../../../pages/detail-product/detail-product.module';
import { DetailProductPage } from '../../../../pages/detail-product/detail-product.page';
import { Routes, RouterModule } from '@angular/router';
import { ShopPageModule } from 'src/app/pages/shop/shop.module';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShopPageModule
  ],
  declarations: [SearchPage],
  entryComponents: [DetailProductPage]
})
export class SearchPageModule { }
