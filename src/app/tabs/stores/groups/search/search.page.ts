import { Component, OnInit } from '@angular/core';
import { Stores } from 'src/app/models/stores';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Product } from 'src/app/models/product';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {


  private storeId: number
  public searchText: string;
  public list = { start: 0, end: 30 };

  constructor(
    private util: UtilitiesService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.storeId = this.util.getValue<Stores>('store').value.id;
  }

  public get getProducts(): Product[] {
    return this.searchService.Products;
  }

  public async loadData(event) {
    if (this.searchService.Products.length > 0 && this.list.end == 30) {
      this.list.start += 31;
      this.searchService.search(this.storeId, this.searchText, this.list.start)
        .subscribe(data => { this.list.end = data.length; event.target.complete(), _ => { event.target.complete(); } });
    }
    else {
      event.target.complete();
    }
  }

  public search() {
    if (this.searchText) {
      this.searchService.search(this.storeId, this.searchText, 0).subscribe(_ => {
      });
    }
    else {
      this.searchService.Products = [];
    }
  }

  public runSearch() {
    this.searchService.Products = null;
  }
}
