import {Component, Input, OnInit} from '@angular/core';
import {FoodModel} from "../../models/food.model";
import {MedicineModel} from "../../models/medicine.model";
import {AlertController} from "@ionic/angular";
import {ApiStorageService} from "../../services/api-storage.service";


@Component({
  selector: 'app-med-item',
  templateUrl: './med-item.component.html',
  styleUrls: ['./med-item.component.scss'],
})
export class MedItemComponent implements OnInit {

  @Input() medItem: MedicineModel;

  constructor(private apiStorageService: ApiStorageService,
              private alertCtrl: AlertController) { }

  onDelete() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really need to delete the med?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Delete',
        handler: () => {
          this.apiStorageService.deleteMed(this.medItem.rxnormId);
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  ngOnInit() {}

}
