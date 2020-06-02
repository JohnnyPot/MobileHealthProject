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

  getInteractions() {
    const interaction_list = '';

    const medList = this.apiStorageService.getAllMeds();

    // let med of this.apiStorageService.getAllMeds()
    for(let i = 0; i < medList.length; i++) {
      if(i < medList.length - 1){
        interaction_list.concat(medList[i].rxnormId.toString() + '+')
      }else{
        interaction_list.concat(medList[i].rxnormId.toString())
      }
    }

    this.apiStorageService.getInteractions(interaction_list).subscribe( interactionJson => {

      console.log(interactionJson);


      // if (interactionJson.hasOwnProperty('fullInteractionTypeGroup')) {
      //   console.log(interactionJson);
      //
      // }

    });

    // return
  }

  ngOnInit() {
  }

}
