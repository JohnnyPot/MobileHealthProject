import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {InteractionModel} from "../models/interaction.model"
import {FoodModel} from "../models/food.model";
import {MedicineModel} from "../models/medicine.model";
import {UserModel} from "../models/user.model";
import {StorageService} from "./storage.service";
import {FoodInteractionModel} from "../models/food-interaction.model";
import {FoodCommentModel} from "../models/food-comment.model";
import {MedCommentModel} from "../models/med-comment.model";


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
    private medComs: MedCommentModel[] = [];
    private foodComs: FoodCommentModel[] = [];

    private foodInterList: FoodInteractionModel[] = [
        {
            drug: 'lipitor',
            food: 'grapefruit',
            description: '',
        },
        {
            drug: 'warfarin',
            food: 'alcohol',
            description: '',
        }
    ]


    private foodList: FoodModel[] = [
        {
            id: 0,
            name: 'alcohol',
        },
        {
            id: 1,
            name: 'flour',
        },
        {
            id: 2,
            name: 'egg',
        },
        {
            id:3,
            name: 'grapefruit'
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
        this.userData.foodComs = this.foodComs;
        this.userData.medComs = this.medComs;
        this.userData.foodInterList = this.foodInterList;

        this.loadData();
        this.getUserData();
        // this.updateInterList();
    }

    loadData() {
        this.storage.getObject('lastActiveUser').then(user => {
            if (user) {
                console.log("loading last active user");
                console.log(user)
                this.activeUser = <UserModel><unknown>user;
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
        this.storage.setObject("lastActiveUser", user);
        this.storage.getObject("userData" + user.id.toString()).then((userData) => {
            console.log("Changing user. User '" + user.name + "'has saved data:");
            console.log(userData);

            if (userData) {
                this.userData = userData;
                if (!this.medList) {
                    this.medList = []
                } else {
                    this.medList = this.userData.medList;
                }
                if (!this.foodList) {
                    this.foodList = [];
                } else {
                    this.foodList = this.userData.foodList;
                }
                if (!this.foodComs) {
                    this.foodComs = [];
                } else {
                    this.foodComs = this.userData.foodComs;
                }
                if (!this.medComs) {
                    this.medComs = [];
                } else {
                    this.medComs = this.userData.medComs;
                }
                if (!this.userData.foodInterList) {
                    this.foodInterList = []
                } else {
                    this.foodInterList = this.userData.foodInterList;
                }
                // console.log(this.medList);
            } else {
                console.log("Using dummy data");
                if (user.name != 'Guest') {
                    this.medList = [];
                    this.foodList = [];
                    this.foodComs = [];
                    this.medComs = [];
                    this.foodInterList = [];
                }
            }
            this.updateInterList();
        });
    }

    // ----------------------------------- Food Interaction ------------------------------------------- //

    addFoodInter(drugName: string, foodName: string, desc: string): void {

        let foodInter: FoodInteractionModel = {
            drug: drugName,
            food: foodName,
            description: desc
        }

        this.foodInterList.push(foodInter);
        this.saveUserData();
    }


    deleteFoodInter(_foodName: string){
        this.foodInterList = this.foodInterList.filter(foodInter => {
            return foodInter.food !== _foodName;
        });
        this.saveUserData();
    }

    getFilteredFoodInter(activeMeds: string[]) {
        let activeFoodInteractions: FoodInteractionModel[] = [];
        for (let foodInter of this.foodInterList) {

            if (activeMeds.some(med => {
                return med === foodInter.drug;
            })) {
                activeFoodInteractions.push(foodInter);
            }
        }
        return activeFoodInteractions;
    }

    countFoodInter(foodName: string): number {
        return this.foodInterList.filter(foodInter => {
            return foodInter.food === foodName;
        }).length;
    }

    getAllFoodInter() {
        return this.foodInterList;
    }


    // ----------------------------------- Food ------------------------------------------- //

    getAllFood() {
        return [...this.foodList];
        // return this.recipes;
    }

    addFood(foodName: string): void {
        let food: FoodModel = {
            id: this.foodList.length,
            name: foodName
        }
        this.foodList.push(food);
        this.saveUserData();
    }

    deleteFood(foodName: string) {
        this.foodList = this.foodList.filter(food => {
            return food.name !== foodName;
        });

        this.deleteFoodInter(foodName);
        this.saveUserData();
    }

    checkFood(foodName: string) {
        return this.foodList.filter(food => {
            return foodName === food.name;
        }).length < 1;
    }

    checkIfFoodCom(food: string): boolean{
        return this.foodComs.some(foodCom => {
            return foodCom.food === food;
        })
    }

    editFoodCom(food: string, comment: string): void{
        let foodComIdx = this.foodComs.findIndex(foodCom => {
            return foodCom.food === food;
        });

        this.foodComs[foodComIdx].comment = comment;
        this.saveUserData();
    }

    addFoodCom(food: string, comment: string) {

        let foodCom: FoodCommentModel = {
            food: food,
            comment: comment
        }

        this.foodComs.push(foodCom);
        this.saveUserData();
    }

    getFoodCom(foodName: string) {
        return this.foodComs.filter(com => {
            return com.food === foodName;
        })[0];
    }


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
        //this.userData.medList = this.medList;
        // this.storage.setObject('userData' + this.activeUser.id.toString(), this.userData).then(() => {
        //     console.log('Saved medList for user:' + JSON.stringify(this.activeUser));
        //     // console.log(JSON.stringify(this.userData));
        // });
        this.updateInterList();
        this.saveUserData();
    }

    deleteMed(recipeId: number) {
        this.medList = this.medList.filter(med => {
            return med.rxnormId !== recipeId;
        });
        this.updateInterList();
        this.saveUserData();
    }

    checkIfMedCom(drug: string): boolean{
        return this.medComs.some(medCom => {
            return medCom.drug === drug;
        })
    }

    editMedCom(drug: string, comment: string): void{
        let medComIdx = this.medComs.findIndex(medCom => {
            return medCom.drug === drug;
        });

        this.medComs[medComIdx].comment = comment;
        this.saveUserData();
    }

    deleteMedCom(drug: string): void{
        let medComIdx = this.medComs.findIndex(medCom => {
            return medCom.drug === drug;
        });

        delete this.medComs[medComIdx];
        this.saveUserData();
    }

    addMedCom(drug: string, comment: string) {

        let medCom: MedCommentModel = {
            drug: drug,
            comment: comment
        }

        this.medComs.push(medCom);
        this.saveUserData();
    }

    getMedCom(drugName: string) {
        return this.medComs.filter(com => {
            return com.drug === drugName;
        })[0];
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

        if(id != 0){
            this.userList = this.userList.filter(user => {
                return user.id !== id;
            });

            this.storage.setObject('userList', this.userList).then(() => {
                console.log("Saved userList");
            });
        }

        this.storage.removeItem("userData" + id.toString()).then(() => {
            console.log("Removed user with id: " + id);
        });
        if (this.activeUser.id == id) {
            this.activeUser = this.userList[0];
            console.log("Active user changed to first in userList (should always be guest):" + JSON.stringify(this.activeUser));
        }
    }

    editUserName(newName: string) {

        let userIdx = this.getActiveUserId()

        this.userList[userIdx].name = newName;

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

    // Get Interactionss
    getInteractions(listOfRxcui: string): Observable<any> {
        return this.http.get(`${this.interactionUrl}interaction/list.json?rxcuis=${listOfRxcui}`);

    }



    // ----------------------------------- Med Interactions ------------------------------------------- //


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

            // console.log(interactionJson);

            if (interactionJson.hasOwnProperty('fullInteractionTypeGroup')) {
                // console.log('Bravo');
                // console.log(interactionJson.fullInteractionTypeGroup.fullInteractionType)

                for (let InteractionTypeGroup of interactionJson.fullInteractionTypeGroup) {
                    // console.log('interaction Group: ' + InteractionTypeGroup.fullInteractionType);

                    for (let InteractionType of InteractionTypeGroup.fullInteractionType) {
                        // console.log('interaction Type: ' + InteractionType);

                        let drugs = []

                        for (let drug of InteractionType.minConcept) {
                            // console.log('Drug`s name: ' + drug.name);
                            drugs.push(drug.name)
                        }

                        // for (let drug of InteractionType.interactionPair[0].interactionConcept) {
                        //     console.log('Drug`s name: ' + drug.minConceptItem.name);
                        //     drugs.push(drug.minConceptItem.name)
                        // }

                        // console.log('Description: ' + InteractionType.interactionPair.description);

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
    saveUserList() {
        this.storage.setObject('userList', this.userList).then(() => {
            console.log("Saved userList");
        });
    }

    // saveFoodInterList() {
    //     this.storage.setObject("foodInterList", this.foodInterList).then(() => {
    //         console.log("Saved foodInterList");
    //     });
    // }
    //
    // getFoodInterList() {
    //     this.storage.getObject("foodInterList").then((foodInterList) => {
    //         console.log("Got foodInterList");
    //         console.log(foodInterList);
    //         this.foodInterList = JSON.parse(foodInterList);
    //     });
    // }

    saveUserData() {
        console.log("entered saveUserData()")
        this.userData = {};
        this.userData.medList = this.medList;
        this.userData.foodList = this.foodList;
        this.userData.foodComs = this.foodComs;
        this.userData.medComs = this.medComs;
        this.userData.foodInterList = this.foodInterList;
        this.storage.setObject('userData' + this.activeUser.id.toString(), this.userData).then(() => {
            console.log('Saved userData for user:' + JSON.stringify(this.activeUser));
            console.log(JSON.stringify(this.userData));
        });
        console.log("exit saveUserData()");
    }

    getUserData() {
        this.storage.getObject("userData" + this.activeUser.id.toString()).then((userData) => {
            this.userData = userData;
            this.medList = this.userData.medList;
            this.foodList = this.userData.foodList;
            this.foodComs = this.userData.foodComs;
            this.medComs = this.userData.medComs;
            this.foodInterList = this.userData.foodInterList;
            console.log("got userData");
            console.log(userData);
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
