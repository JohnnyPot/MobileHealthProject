import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {InteractionModel} from "../models/interaction.model"
import {FoodModel} from "../models/food.model";
import {MedicineModel} from "../models/medicine.model";
import {UserModel} from "../models/user.model";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class ApiStorageService {
    interactionUrl: string = 'https://rxnav.nlm.nih.gov/REST/';
    interactionLimit = '?_limit=5';

    constructor(private http: HttpClient) {
    }

    // ----------------------------------- Food ------------------------------------------- //


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

    // deleteRecipe(recipeId: string) {
    //   this.recipes = this.recipes.filter(recipe => {
    //     return recipe.id !== recipeId;
    //   });
    // }

    // ----------------------------------- Meds ------------------------------------------- //


    getAllMeds(): MedicineModel[] {
        return [...this.medList];
        // return this.recipes;
    }

    checkMed(rxnormId: number) {
        return this.medList.filter(meds => {
            return meds.rxnormId === rxnormId;
        }).length < 1;
    }

    // Delete
    addMed(med: MedicineModel): void {
        if (this.checkMed(med.rxnormId)) {
            this.medList.push(med);
        }

    }

    deleteMed(recipeId: number) {
        this.medList = this.medList.filter(med => {
            return med.rxnormId !== recipeId;
        });
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

    // ----------------------------------- Users ------------------------------------------- //

    private userList: UserModel[] = [
        {
            id: 0,
            name: 'Guest'
        },
        {
            id: 1,
            name: 'Timos'
        },
        {
            id: 2,
            name: 'JohnnyPot'
        },
        {
            id: 3,
            name: 'Giannis'
        }
    ];

    checkUser(name: string) {
        return this.userList.filter(user => {
            return user.name === name;
        }).length < 1;
    }

    // Delete
    addUser(name: string): void {
        if (this.checkUser(name)) {
            const user = {
                id: this.userList.length,
                name: name
            }
            this.userList.push(user);
        }
    }

    deleteUser(id: number) {
        this.userList = this.userList.filter(user => {
            return user.id !== id;
        });
    }


    getAllUsers(): UserModel[] {
        return [...this.userList];
    }


    // ----------------------------------- HTTP Requests ------------------------------------------- //


    // Get Interactions
    // getRxcui(name: string): Observable<MedicineModel>{
    //   return this.http.get<MedicineModel>(`${this.interactionUrl}rxcui.json?name=${name}`);
    // }

    // Get Interactions
    getRxcui(name: string): Observable<any> {
        return this.http.get(`${this.interactionUrl}rxcui.json?name=${name}`);
    }


    // Get Interactions
    getInteractions(listOfRxcui: string): Observable<any> {
        return this.http.get(`${this.interactionUrl}interaction/list.json?rxcuis=${listOfRxcui}`);
    }

    // // Toggle Completed
    // toggleCompleted(interaction: InteractionModel): Observable<any> {
    //     const url = `${this.interactionUrl}/${interaction.id}`;
    //     return this.http.put(url, interaction, httpOptions);
    // }
    //
    // // Delete
    // deleteInteraction(interaction: InteractionModel): Observable<any> {
    //     const url = `${this.interactionUrl}/${interaction.id}`;
    //     return this.http.delete(url, httpOptions);
    // }
    //
    // // Delete
    // addInteraction(interaction: InteractionModel): Observable<InteractionModel> {
    //     return this.http.post<InteractionModel>(this.interactionUrl, interaction, httpOptions);
    // }
}
