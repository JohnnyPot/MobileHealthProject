import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { InteractionModel } from "../models/interaction.model"
import {FoodModel} from "../models/food.model";
import {MedicineModel} from "../models/medicine.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiStorageService {
  interactionUrl:string = 'https://rxnav.nlm.nih.gov/REST/';
  interactionLimit = '?_limit=5';

  constructor(private http: HttpClient) { }


  private foodList: FoodModel[] = [
    {
      id: 'r1',
      title: 'Schnitzel',
      // tslint:disable-next-line:max-line-length
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG/220px-Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
      ingredients: ['French fries', 'Pork meat', 'flour', 'eggs']
    },
    {
      id: 'r2',
      title: 'Spaghetti',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Spaghetti_spiral%2C_2008.jpg/126px-Spaghetti_spiral%2C_2008.jpg',
      ingredients: ['Pasta', 'Tomatoes', 'Salt', 'Garlic', 'Onion']
    }
  ];

  getAllFood() {
    return [...this.foodList];
    // return this.recipes;
  }

  // getRecipe(recipeId: string) {
  //   return {
  //     ...this.recipes.find(recipe => {
  //       return recipe.id === recipeId;
  //     })
  //   };
  // }
  //
  // deleteRecipe(recipeId: string) {
  //   this.recipes = this.recipes.filter(recipe => {
  //     return recipe.id !== recipeId;
  //   });
  // }

  getAllMeds(): MedicineModel[]{
    return [...this.medList];
    // return this.recipes;
  }

  private medList: MedicineModel[] = [
    {
      name: 'ebastine',
      rxnormId: 23796
    },
    {
      name: 'lipitor',
      rxnormId: 153165
    }
  ];

  // ----------------------------------- HTTP Requests ------------------------------------------- //


  // Get Interactions
  // getRxcui(name: string): Observable<MedicineModel>{
  //   return this.http.get<MedicineModel>(`${this.interactionUrl}rxcui.json?name=${name}`);
  // }

  // Get Interactions
  getRxcui(name: string): Observable<any>{
    return this.http.get(`${this.interactionUrl}rxcui.json?name=${name}`);
  }



  // Get Interactions
  getInteractions(): Observable<InteractionModel[]>{
    return this.http.get<InteractionModel[]>(`${this.interactionUrl}${this.interactionLimit}`);
  }

  // Toggle Completed
  toggleCompleted(interaction: InteractionModel): Observable<any> {
    const url = `${this.interactionUrl}/${interaction.id}`;
    return this.http.put(url, interaction, httpOptions);
  }

  // Delete
  deleteInteraction(interaction:InteractionModel): Observable<any> {
    const url = `${this.interactionUrl}/${interaction.id}`;
    return this.http.delete(url, httpOptions);
  }

  // Delete
  addInteraction(interaction:InteractionModel): Observable<InteractionModel> {
    return this.http.post<InteractionModel>(this.interactionUrl, interaction, httpOptions);
  }
}
