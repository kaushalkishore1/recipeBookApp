import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
//import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

import { AuthService } from "./auth";

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(private authService: AuthService,public http: HttpClient) {
  }

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://ionic-recipebook-ddcac.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-recipebook-ddcac.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((ingredients: Ingredient[]) => {
        if (ingredients) {
          this.ingredients = ingredients
        } else {
          this.ingredients = [];
        }
      });
  }
}
