import { Component, OnInit } from '@angular/core';
import { Stores } from 'src/app/models/stores';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { SearchService } from '../search/search.service';
import { Product } from 'src/app/models/product';
import { SaleService } from './sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
})
export class SalePage implements OnInit {

  private storeId: number;
  public searchText = '';
  public list = { start: 0, end: 30 };

  constructor(
    private util: UtilitiesService,
    private saleService: SaleService
  ) { }

  ngOnInit() {
    this.storeId = this.util.getValue<Stores>('store').value.id;
    this.search()
  }

  public get getProducts(): Product[] {
    return this.saleService.Products;
  }

  public async loadData(event) {
    if (this.saleService.Products.length > 0 && this.list.end == 30) {
      this.list.start += 31;
      this.saleService.search(this.storeId, this.searchText, this.list.start)
        .subscribe(data => { this.list.end = data.length; event.target.complete(), _ => { event.target.complete(); } });
    }
    else {
      event.target.complete();
    }
  }

  public search() {
    this.saleService.Products = null;
    this.list.start = 0;
    this.saleService.search(this.storeId, this.searchText, 0).subscribe(data => {
      this.list.end = data.length
    });
  }

  public runSearch() {
    this.saleService.Products = null;
  }

}
