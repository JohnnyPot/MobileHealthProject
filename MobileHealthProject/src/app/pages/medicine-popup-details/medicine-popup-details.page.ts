import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ApiStorageService} from "../../services/api-storage.service";
import {MedicineModel} from "../../models/medicine.model";
import {FoodModel} from "../../models/food.model";

@Component({
  selector: 'app-medicine-popup-details',
  templateUrl: './medicine-popup-details.page.html',
  styleUrls: ['./medicine-popup-details.page.scss'],
})
export class MedicinePopupDetailsPage implements OnInit {

  constructor(public viewCtrl: ModalController,
              private apiStorageService: ApiStorageService) { }

  foodName: string = '';
  foodSugs: FoodModel[] = []

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getFoodSuggestions(){
    console.log(this.apiStorageService.getAllFood());
    this.foodSugs = this.apiStorageService.getAllFood().filter(food => {
      return food.name.startsWith(this.foodName);
    })
  }

  onClear(): void {
    this.clearFoodSugs();
  }

  onFoodUpdate(search: string): void {
    this.foodName = search;
    this.clearFoodSugs();
  }

  clearFoodSugs(): void {
    this.foodSugs = [];
  }

  ngOnInit() {}

}
