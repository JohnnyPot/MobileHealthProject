import { Component, OnInit } from '@angular/core';
import { ApiStorageService } from "../../services/api-storage.service";
import {AlertController} from "@ionic/angular";
import {MedicineModel} from "../../models/medicine.model";
import {FoodModel} from "../../models/food.model";

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {



  foodComStr: string = '';
  foodName: string = '';
  foodSugs: FoodModel[] = []
  desc: string = '';

  constructor(private apiStorageService: ApiStorageService) { }
  // constructor() { }

  getAllFood(){
    return this.apiStorageService.getAllFood()
  }


  addMed(_name: string, _rxnormId: number): void {
    const med = {
      name: _name,
      rxnormId: _rxnormId
    }

    this.apiStorageService.addMed(med);

  }

  onClear(): void {
    this.foodName = '';
    this.clearSugs();
  }

  onUpdate(search: string): void {
    this.foodName = search;
    this.clearSugs();
  }

  clearSugs(): void {
    this.foodSugs = [];
  }

  ngOnInit() {
  }

}
