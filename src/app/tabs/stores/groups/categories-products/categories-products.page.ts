import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from './product.service';
import { BasketService } from 'src/app/tabs/basket/basket.service';
import { Category, Stores, Group } from 'src/app/models/stores';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Product } from 'src/app/models/product';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-categories-products',
  templateUrl: './categories-products.page.html',
  styleUrls: ['./categories-products.page.scss'],
})
export class CategoriesProductsPage implements OnInit {

  public currentCategory: number;
  private storeId: number;
  public groupId: number;
  public title: string;
  public list = { start: 0, end: 30 };

  constructor(
    private util: UtilitiesService,
    private productService: ProductService,
    private basket: BasketService,
  ) { }

  public doRefresh(event) {
    this.loadProducts(this.currentCategory)
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  ngOnInit() {
    this.storeId = this.util.getValue<Stores>('store').value.id;
    let group = this.util.getValue<Group>('group').value;
    this.title = group.name;
    this.groupId = group.id;
    this.productService.loadCategories(this.groupId)
      .subscribe(group => {
        this.currentCategory = group[0].id;
        this.loadProducts(this.currentCategory);
      });
  }

  public get getCategories(): Category[] {
    return this.productService.categories;
  }

  public get getProducts(): Product[] {
    if (this.productService.Products)
      return this.productService.Products;
  }

  public async loadProducts(id: number) {
    this.list.start = 0;
    this.currentCategory = id;
    this.productService.Products = null;
    this.productService.loadProducts(this.storeId, this.currentCategory)
      .subscribe(data => { this.list.end = data.length; });
    this.logScrollStart()
  }

  public async loadData(event) {
    if (this.productService.Products && this.productService.Products.length > 0 && this.list.end == 30) {
      this.list.start += 31;
      this.productService.loadProducts(this.storeId, this.currentCategory, this.list.start)
        .subscribe(data => { this.list.end = data.length; event.target.complete(), _ => { event.target.complete(); } });
    }
    else {
      event.target.complete();
    }
  }

  public logScrollStart() {
    let scrollContent: any = document.getElementById("listScroll");
    scrollContent.scrollToTop();
  }

}