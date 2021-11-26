import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategoriesProductsPage } from './categories-products.page';
import { DetailProductPageModule } from 'src/app/pages/detail-product/detail-product.module';
import { DetailProductPage } from 'src/app/pages/detail-product/detail-product.page';
import { ShopPageModule } from 'src/app/pages/shop/shop.module';

const routes: Routes = [
  {
    path: '',
    component: CategoriesProductsPage
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
  declarations: [CategoriesProductsPage],
  entryComponents: []
})
export class GroupsProductsPageModule { }
