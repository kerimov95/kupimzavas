import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../services/auth-guard.guard';
import { authService } from '../services/auth.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./profile/profile.module').then(m => m.ProfilePageModule), canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'stores',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./stores/stores.module').then(m => m.StoresPageModule)
          },
          {
            path: 'groups',
            children: [
              {
                path: '',
                loadChildren: () => import('./stores/groups/groups.module').then(m => m.GroupsPageModule),
              },
              {
                path: 'products',
                loadChildren: () => import('./stores/groups/categories-products/categories-products.module').then(m => m.GroupsProductsPageModule),
              },
              {
                path: 'search',
                loadChildren: () => import('./stores/groups/search/search.module').then(m => m.SearchPageModule),
              },
              {
                path: 'sale',
                loadChildren: () => import('./stores/groups/sale/sale.module').then(m => m.SalePageModule)
              }
            ]
          }
        ]
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./orders/orders.module').then(m => m.OrdersPageModule), canActivate: [AuthGuard]
          },
          {
            path: 'details',
            children: [
              { path: '', loadChildren: () => import('./orders/order-details/order-details.module').then(m => m.OrderDetailsPageModule), canActivate: [AuthGuard] },
            ]
          }
        ]
      },
      {
        path: 'basket',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./basket/basket.module').then(m => m.BasketPageModule)
          },
          {
            path: 'check',
            loadChildren: () =>
              import('./basket/checkout/checkout.module').then(m => m.CheckoutPageModule),
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/stores',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/stores',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
