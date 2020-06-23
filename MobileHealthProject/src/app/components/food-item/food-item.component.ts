import {Component, Input, OnInit} from '@angular/core';
import {FoodModel} from "../../models/food.model";
import {AlertController} from "@ionic/angular";
import {ApiStorageService} from "../../services/api-storage.service";

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss'],
})
export class FoodItemComponent implements OnInit {

  @Input() foodItem: FoodModel;

  constructor(private alertCtrl: AlertController,
              private apiStorageService: ApiStorageService) { }


  hideme: boolean = false;

  getFoodCom() {
    if (this.apiStorageService.checkIfFoodCom(this.foodItem.name)) {
      return this.apiStorageService.getFoodCom(this.foodItem.name).comment;
    } else {
      return '';
    }
  }

  getColor() {
    return this.hideme && this.getFoodCom() !== '' ? 'primary' : '';
  }

  hideFunc() {
    this.hideme = !this.hideme;
  }


  countFoodInter(): number {
    return this.apiStorageService.countFoodInter(this.foodItem.name);
  }

  onDelete() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really need to delete the Food Item?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Delete',
        handler: () => {
          this.apiStorageService.deleteFood(this.foodItem.name);
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  ngOnInit() {}

}
