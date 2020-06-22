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

  constructor(private apiStorageService: ApiStorageService,
              private alertCtrl: AlertController) { }

  getAllFood(){
    return this.apiStorageService.getAllFood()
  }

  onSubmit(){
    if (this.apiStorageService.checkFood(this.foodName)) {
      this.addFood(this.foodName);
    } else {
      this.alertCtrl.create({
        header: 'Warning',
        message: 'This food there is already in your list ',
        buttons: [{
          text: 'Ok',
          role: 'Okay'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
  }





  addFood(_name: string): void {
    this.apiStorageService.addFood(_name);
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
