import { Component, OnInit } from '@angular/core';
import {ApiStorageService} from "../../services/api-storage.service";
import {AlertController} from "@ionic/angular";
import {MedicineModel} from "../../models/medicine.model";

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.page.html',
  styleUrls: ['./medicines.page.scss'],
})
export class MedicinesPage implements OnInit {

  name: string


  constructor(private apiStorageService: ApiStorageService,
              private alertCtrl: AlertController) { }

  getListOfMed(): MedicineModel[]{
     return this.apiStorageService.getAllMeds();
  }

  onSubmit(): void{
    this.apiStorageService.getRxcui(this.name).subscribe(med => {
      if (med.idGroup.hasOwnProperty('rxnormId')) {
        console.log(med.idGroup.rxnormId);
      }else{
        this.alertCtrl.create({
          header: 'There is no such Med`s name ',
          message: 'Be sure you type you do not misspell the name',
          buttons: [{
            text: 'Ok',
            role: 'Okay'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }
    })
    // console.log('ok');
  }

  onClear(): void{
    this.name = '';
  }

  ngOnInit() {
  }

}
