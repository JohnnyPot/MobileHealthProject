import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {ApiStorageService} from "../../services/api-storage.service";
import {MedicineModel} from "../../models/medicine.model";
import {FoodModel} from "../../models/food.model";
import {FoodInteractionModel} from "../../models/food-interaction.model";

@Component({
    selector: 'app-medicine-popup-details',
    templateUrl: './medicine-popup-details.page.html',
    styleUrls: ['./medicine-popup-details.page.scss'],
})
export class MedicinePopupDetailsPage implements OnInit {

    constructor(public viewCtrl: ModalController,
                private alertCtrl: AlertController,
                private apiStorageService: ApiStorageService) {
    }

    @Input() medItem: MedicineModel;

    medComStr: string = '';
    foodName: string = '';
    foodSugs: FoodModel[] = []
    desc: string = '';

    foodInterList: FoodInteractionModel[] = []

    dismiss() {
        this.viewCtrl.dismiss();
    }

    getFoodSuggestions() {
        // console.log(this.apiStorageService.getAllFood());
        this.foodSugs = this.apiStorageService.getAllFood().filter(food => {
            return food.name.startsWith(this.foodName);
        })
    }

    getFoodInter() {
        return this.apiStorageService.getFilteredFoodInter([this.medItem.name]);
    }

    onClear(): void {
        this.foodName = '';
        this.desc = '';
        this.clearFoodSugs();
    }

    onFoodUpdate(search: string): void {
        this.foodName = search;
        this.clearFoodSugs();
    }

    clearFoodSugs(): void {
        this.foodSugs = [];
    }

    addFoodInteraction() {
        let foodsWithThisName: number = this.apiStorageService.getAllFood().filter(food => {
            return food.name.toUpperCase() === this.foodName.toUpperCase();
        }).length;

        let foodName = this.foodName;

        if (foodsWithThisName == 0) {
            this.alertCtrl.create({
                header: 'This food is not in your list',
                message: 'If you continue you will automatically add it as a new item',
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel'
                }, {
                    text: 'Continue',
                    handler: () => {
                        this.apiStorageService.addFood(foodName);
                        // console.log('foodName: ' + foodName);
                    }
                }]
            }).then(alertEl => {
                alertEl.present();
            });
        }

        // console.log('foodsWithThisName: ' + foodsWithThisName);

        this.apiStorageService.addFoodInter(this.medItem.name, this.foodName, this.desc);

        this.foodInterList = this.apiStorageService.getAllFoodInter();

        this.onClear();
    }

    // addNewFood(): void {
    //     this.apiStorageService.addFood(this.foodName);
    // }

    getMedCom() {
        if (this.apiStorageService.checkIfMedCom(this.medItem.name)) {
            this.medComStr = this.apiStorageService.getMedCom(this.medItem.name).comment;
        } else {
            this.medComStr = ''
        }
    }

    saveMedCom() {
        if (this.apiStorageService.checkIfMedCom(this.medItem.name)) {
            this.apiStorageService.editMedCom(this.medItem.name, this.medComStr);
        } else {
            this.apiStorageService.addMedCom(this.medItem.name, this.medComStr);
        }
        // console.log("oook");
    }

    ngOnInit() {
        this.foodInterList = this.apiStorageService.getAllFoodInter();
        this.getMedCom();
    }

}
