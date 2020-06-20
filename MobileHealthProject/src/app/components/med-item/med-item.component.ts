import {Component, Input, OnInit} from '@angular/core';
import {FoodModel} from "../../models/food.model";
import {MedicineModel} from "../../models/medicine.model";
import {AlertController, ModalController} from "@ionic/angular";
import {ApiStorageService} from "../../services/api-storage.service";
import {AddUserPopupPage} from "../../pages/add-user-popup/add-user-popup.page";
import {MedicinePopupDetailsPage} from "../../pages/medicine-popup-details/medicine-popup-details.page";


@Component({
  selector: 'app-med-item',
  templateUrl: './med-item.component.html',
  styleUrls: ['./med-item.component.scss'],
})
export class MedItemComponent implements OnInit {

  @Input() medItem: MedicineModel;

  hideme: boolean = false;

  getColor(){
    return this.hideme ? 'primary' : '';
  }

  hideFunc(){
    this.hideme = !this.hideme;
  }


  constructor(private apiStorageService: ApiStorageService,
              private alertCtrl: AlertController,
              public modalController: ModalController) { }

  async openEditModal() {
    const modal = await this.modalController.create({
      component: MedicinePopupDetailsPage,
      componentProps: {
        'medItem': this.medItem
      }
    });
    return await modal.present();
  }

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
