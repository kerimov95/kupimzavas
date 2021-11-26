import { Component } from '@angular/core';
import { StoreService } from './store.service';
import { Router } from '@angular/router';
import { Params } from 'src/app/services/AppConfig';
import { StoresType, Stores } from 'src/app/models/stores';
import { UtilitiesService } from 'src/app/services/utilities.service';
@Component({
  selector: 'app-stores',
  templateUrl: 'stores.page.html',
  styleUrls: ['stores.page.scss']
})
export class StoresPage {

  public selectedType: number;
  public loadStatus: boolean;

  constructor(
    private util: UtilitiesService,
    private storeService: StoreService,
    private app: Params,
    private router: Router) { }

  ngOnInit() {
    this.storeService.loadTypes()
      .subscribe(data => {
        this.selectedType = data[0].id
        this.storeService.loadStores(this.selectedType)
          .subscribe()
      })
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.loadStatus = true;
    }, 1000);
  }

  public get StatusLoad(): boolean {
    if (this.loadStatus && !this.util.statusLoad)
      return true;
    else
      return false;
  }

  public async loadStores() {
    let load = await this.util.presentLoading();
    this.storeService.loadStores(this.selectedType).subscribe(
      _ => load.dismiss(), _ => load.dismiss()
    )
  }

  public getTypes(): StoresType[] {
    return this.storeService.storesTypeArr
  }

  public getStore(): Stores[] {
    return this.storeService.storesArr
  }

  public navigate(store: Stores) {
    this.util.setValue<Stores>({ key: 'store', value: store });
    this.router.navigate(['home/tabs/stores/groups']);
  }

  public doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
}
