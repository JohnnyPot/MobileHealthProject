import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {InteractionModel} from "../models/interaction.model"
import {FoodModel} from "../models/food.model";
import {MedicineModel} from "../models/medicine.model";
import {UserModel} from "../models/user.model";
import {StorageService} from "./storage.service";


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

    private activeUser: UserModel;
    private userData : any;
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

    constructor(private http: HttpClient,
                private storage: StorageService) {
        this.loadData();
    }

    loadData() {
        this.storage.getObject('lastActiveUser').then((user) =>
        {
            if(user){
                console.log("loading last active user");
                this.activeUser = user.value;
            } else {
                console.log("no last active user, setting guest");
                this.activeUser = this.userList[0];
            }
        }).then(() =>
        {
            this.storage.getObject('userList').then((userList) =>
            {
                if(userList) {
                    console.log("loading user list:");
                    console.log(JSON.stringify(userList));
                    console.log(typeof(userList));
                    this.userList = Object.values(userList.value);
                } else {
                    console.log("no user list, using dummy one");
                }
            }).then(() =>
            {
                console.log("changing user to last active:" + JSON.stringify(this.activeUser));
                this.changeUser(this.activeUser);
            })
        });

    }

    changeUser(user: UserModel){
        this.storage.getObject("userData" + user.id.toString()).then((userData) =>
        {
            console.log("User has saved data:" + userData);
            if (userData) {
                this.userData = userData.value;
                this.medList = this.userData.medList;
                this.foodList = this.userData.foodList;
            } else {
                console.log("Using dummy data");
            }
        });
    }



    // ----------------------------------- Food ------------------------------------------- //

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
        this.userData.medList = this.medList;
        this.storage.setObject('userData' + this.activeUser.id.toString(), this.userData).then(()=>
        {
            console.log('Saved medList');
        });
    }

    deleteMed(recipeId: number) {
        this.medList = this.medList.filter(med => {
            return med.rxnormId !== recipeId;
        });
    }



    // ----------------------------------- Users ------------------------------------------- //



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
        this.storage.setObject('userList', this.userList).then(() =>
        {
            console.log("Saved userList");
        });
        this.storage.getObject('userList').then(list =>{
            console.log(JSON.stringify(list));
        })

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
