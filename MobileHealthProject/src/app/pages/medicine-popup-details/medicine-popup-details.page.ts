import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ApiStorageService} from "../../services/api-storage.service";
import {MedicineModel} from "../../models/medicine.model";

@Component({
  selector: 'app-medicine-popup-details',
  templateUrl: './medicine-popup-details.page.html',
  styleUrls: ['./medicine-popup-details.page.scss'],
})
export class MedicinePopupDetailsPage implements OnInit {

  constructor(public viewCtrl: ModalController,
              private apiStorageService: ApiStorageService) { }

  medName: string = '';
  medSugs: MedicineModel[] = [];

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getSuggestions(){
    this.medSugs = this.apiStorageService.getAllMeds().filter(med => {
      return med.name.startsWith(this.medName);
    })

    console.log(this.medSugs);
  }

  onClear(): void {
    this.medName = '';
    this.clearSugs();
  }

  onUpdate(search: string): void {
    this.medName = search;
    this.clearSugs();
  }

  clearSugs(): void {
    this.medSugs = [];
  }

  ngOnInit() {
  }

}
