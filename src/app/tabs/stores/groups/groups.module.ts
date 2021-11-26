import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GroupsPage } from './groups.page';
import { SearchPageModule } from 'src/app/tabs/stores/groups/search/search.module';
import { SearchPage } from 'src/app/tabs/stores/groups/search/search.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [GroupsPage],
  entryComponents: []
})
export class GroupsPageModule { }
