import { Component, OnInit } from '@angular/core';
import {ApiStorageService} from "../../services/api-storage.service";

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.page.html',
  styleUrls: ['./medicines.page.scss'],
})
export class MedicinesPage implements OnInit {

  name: string


  constructor(private apiStorageService: ApiStorageService) { }

  searchForMed() {
     this.apiStorageService.getRxcui(this.name);
  }

  onSubmit(): void{
    this.apiStorageService.getRxcui(this.name).subscribe(med => {
      console.log(med.idGroup.rxnormId[0]);
    })
    console.log();
    // console.log('ok');
  }

  onClear(): void{
    this.name = '';
  }

  ngOnInit() {
  }

}
