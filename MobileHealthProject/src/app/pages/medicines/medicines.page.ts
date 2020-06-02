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

  addMed(_name: string, _rxnormId: number): void {
    const med = {
      name: _name,
      rxnormId: _rxnormId
    }

    this.apiStorageService.addMed(med);

  }

  onSubmit(): void{
    this.apiStorageService.getRxcui(this.name).subscribe(med => {
      if (med.idGroup.hasOwnProperty('rxnormId')) {

        if(this.apiStorageService.checkMed(parseInt(med.idGroup.rxnormId[0]))){
          this.addMed(med.idGroup.name, parseInt(med.idGroup.rxnormId[0]));
          console.log(med.idGroup.rxnormId);
        }else{
          this.alertCtrl.create({
            header: 'Warning',
            message: 'This med there is already in your list ',
            buttons: [{
              text: 'Ok',
              role: 'Okay'
            }]
          }).then(alertEl => {
            alertEl.present();
          });
        }

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
