import { Component, OnInit } from '@angular/core';
import {MedicineModel} from "../../models/medicine.model";
import {ApiStorageService} from "../../services/api-storage.service";

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.page.html',
  styleUrls: ['./interactions.page.scss'],
})
export class InteractionsPage implements OnInit {

  constructor(private apiStorageService: ApiStorageService) { }

  getInteractions(): any[]{

    const interaction_list = '';


    for(let med of this.apiStorageService.getAllMeds()){
      interaction_list.concat(med.rxnormId + '+')
    }

    this.apiStorageService.getInteractions(interaction_list).subscribe( interactionJson => {

      if (interactionJson.idGroup.hasOwnProperty('rxnormId')) {

      }

    });

    return
  }

  ngOnInit() {
  }

}
