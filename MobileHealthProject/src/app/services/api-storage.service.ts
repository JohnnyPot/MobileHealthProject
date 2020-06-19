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

    private activeUser: UserModel = {id: 0, name: 'Guest'};
    private userData: any;
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
    private interList: InteractionModel[] = [];


    constructor(private http: HttpClient,
                private storage: StorageService) {
        this.userData = {};
        this.userData.medList = this.medList;
        this.userData.foodList = this.foodList;
        this.loadData();
        // this.updateInterList();
    }

    loadData() {
        this.storage.getObject('lastActiveUser').then((user) => {
            if (user) {
                console.log("loading last active user");
                this.activeUser = user.value;
            } else {
                console.log("no last active user, setting guest");
                this.activeUser = this.userList[0];
            }
        }).then(() => {
            this.storage.getObject('userList').then((userList) => {
                if (userList) {
                    console.log("loading user list:");
                    console.log(JSON.stringify(userList));
                    console.log(typeof (userList));
                    this.userList = Object.values(userList);
                } else {
                    console.log("no user list, using dummy one");
                }
            }).then(() => {
                console.log("changing user to last active:" + JSON.stringify(this.activeUser));
                this.changeUser(this.activeUser);
            })
        });

    }

    getActiveUserId() {
        return this.activeUser.id;
    }


    changeUser(user: UserModel) {

        // if (user.id == this.activeUser.id) {
        //     return;
        // }

        this.activeUser = user;
        this.storage.getObject("userData" + user.id.toString()).then((userData) => {
            console.log("Changing user. User '" + user.name + "'has saved data:");
            console.log(JSON.stringify(userData));

            if (userData) {
                this.userData = userData;
                this.medList = this.userData.medList;
                console.log(this.medList);
                this.foodList = this.userData.foodList;
            } else {
                console.log("Using dummy data");
                if (user.name != 'Guest') {
                    this.medList = [];
                    this.foodList = [];
                }
            }
            this.updateInterList();
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
        this.storage.setObject('userData' + this.activeUser.id.toString(), this.userData).then(() => {
            console.log('Saved medList for user:' + JSON.stringify(this.activeUser));
            console.log(JSON.stringify(this.userData));
        });
        this.updateInterList();
    }

    deleteMed(recipeId: number) {
        this.medList = this.medList.filter(med => {
            return med.rxnormId !== recipeId;
        });
        this.updateInterList();
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
        this.storage.setObject('userList', this.userList).then(() => {
            console.log("Saved userList");
        });
        this.storage.getObject('userList').then(list => {
            console.log(JSON.stringify(list));
        })

    }

    deleteUser(id: number) {

        this.userList = this.userList.filter(user => {
            return user.id !== id;
        });

        this.storage.setObject('userList', this.userList).then(() => {
            console.log("Saved userList");
        });

        this.storage.removeItem("userData" + id.toString()).then(() => {
            console.log("Removed user with id: " + id);
        });
        if (this.activeUser.id == id) {
            this.activeUser = this.userList[0];
            console.log("Active user changed to first in userList (should always be guest):" + JSON.stringify(this.activeUser));
        }
    }

    editUserName(id: number, editedUser: UserModel) {
        let userOnChange: UserModel = this.userList.filter(user => {
            return user.id === id;
        })[0];

        if(userOnChange){
            userOnChange = editedUser;
        }

        this.storage.setObject('userList', this.userList).then(() => {
            console.log("Saved userList");
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

    // Get med's rxcui code
    getRxcui(name: string): Observable<any> {
        return this.http.get(`${this.interactionUrl}rxcui.json?name=${name}`);
    }

    // Get med's rxcui code
    getSuggestionsForMedName(name: string): Observable<any> {
        return this.http.get(`${this.interactionUrl}spellingsuggestions.json?name=${name}`);
    }

    // Get Interactions
    getInteractions(listOfRxcui: string): Observable<any> {
        return this.http.get(`${this.interactionUrl}interaction/list.json?rxcuis=${listOfRxcui}`);
    }

    getInterFilteredList(names: string[]) {

        let filteredInters: InteractionModel[] = [];

        for (let inter of this.interList) {

            if (names.length == 1) {
                if (names.some((med) => {
                    return med.toUpperCase() === inter.drugs[0].toUpperCase() ||
                        med.toUpperCase() === inter.drugs[1].toUpperCase();
                })) {
                    filteredInters.push(inter);
                }
            } else {
                if (names.some((med) => {
                    return med.toUpperCase() === inter.drugs[0].toUpperCase();
                }) && names.some((med) => {
                    return med.toUpperCase() === inter.drugs[1].toUpperCase();
                })) {
                    filteredInters.push(inter);
                }
            }

        }

        return filteredInters;
    }

    getInterList() {
        return this.interList;
    }

    updateInterList() {
        let interaction_drugRxcuis = '';
        const medList = this.getAllMeds();
        this.interList = [];

        // let med of this.apiStorageService.getAllMeds()
        for (let i = 0; i < medList.length; i++) {
            if (i < medList.length - 1) {
                interaction_drugRxcuis = interaction_drugRxcuis.concat(medList[i].rxnormId.toString() + '+')
            } else {
                interaction_drugRxcuis = interaction_drugRxcuis.concat(medList[i].rxnormId.toString())
            }
            // console.log(medList[i].rxnormId.toString() + ' - edw');
        }
        // console.log(interaction_list + ' oli i lista');

        this.getInteractions(interaction_drugRxcuis).subscribe(interactionJson => {

            console.log(interactionJson);

            if (interactionJson.hasOwnProperty('fullInteractionTypeGroup')) {
                // console.log('Bravo');
                // console.log(interactionJson.fullInteractionTypeGroup.fullInteractionType)

                for (let InteractionTypeGroup of interactionJson.fullInteractionTypeGroup) {
                    console.log('interaction Group: ' + InteractionTypeGroup.fullInteractionType);

                    for (let InteractionType of InteractionTypeGroup.fullInteractionType) {
                        console.log('interaction Type: ' + InteractionType);

                        let drugs = []

                        for (let drug of InteractionType.minConcept) {
                            console.log('Drug`s name: ' + drug.name);
                            drugs.push(drug.name)
                        }

                        // for (let drug of InteractionType.interactionPair[0].interactionConcept) {
                        //     console.log('Drug`s name: ' + drug.minConceptItem.name);
                        //     drugs.push(drug.minConceptItem.name)
                        // }

                        console.log('Description: ' + InteractionType.interactionPair.description);

                        let interaction = {
                            drugs: drugs,
                            description: InteractionType.interactionPair[0].description
                        }

                        this.interList.push(interaction);
                    }
                }
            } else {
                console.log('no interactions');
            }
        });
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
