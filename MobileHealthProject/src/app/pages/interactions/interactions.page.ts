import {Component, OnInit} from '@angular/core';
import {MedicineModel} from "../../models/medicine.model";
import {ApiStorageService} from "../../services/api-storage.service";
import {AlertController} from "@ionic/angular";
import {stringify} from "querystring";
import {InteractionModel} from "../../models/interaction.model";

@Component({
    selector: 'app-interactions',
    templateUrl: './interactions.page.html',
    styleUrls: ['./interactions.page.scss'],
})
export class InteractionsPage implements OnInit {

    constructor(private apiStorageService: ApiStorageService,
                private alertCtrl: AlertController) {
    }

    interactions: InteractionModel[] = [];



    getInteractions() {
        let interaction_list = '';

        const medList = this.apiStorageService.getAllMeds();

        // let med of this.apiStorageService.getAllMeds()
        for (let i = 0; i < medList.length; i++) {
            if (i < medList.length - 1) {
                interaction_list = interaction_list.concat(medList[i].rxnormId.toString() + '+')
            } else {
                interaction_list = interaction_list.concat(medList[i].rxnormId.toString())
            }

            // console.log(medList[i].rxnormId.toString() + ' - edw');
        }

        // console.log(interaction_list + ' oli i lista');

        this.apiStorageService.getInteractions(interaction_list).subscribe(interactionJson => {

            console.log(interactionJson);

            if (interactionJson.hasOwnProperty('fullInteractionTypeGroup')) {
                // console.log('Bravo');

                // console.log(interactionJson.fullInteractionTypeGroup.fullInteractionType)

                for (let InteractionTypeGroup of interactionJson.fullInteractionTypeGroup) {
                    console.log('interaction Group: ' + InteractionTypeGroup.fullInteractionType);

                    for (let InteractionType of InteractionTypeGroup.fullInteractionType) {
                        console.log('interaction Type: ' + InteractionType);

                        let drugs = []
                        let descriptions = []

                        for (let drug of InteractionType.minConcept) {
                            console.log('Drug`s name: ' + drug.name);
                            drugs.push(drug.name)
                        }

                        descriptions.push(InteractionType.interactionPair[0].description);
                        console.log('Description: ' + InteractionType.interactionPair.description);


                        // for (let interactionPair of InteractionType.interactionPair) {
                        //     console.log('Description: ' + interactionPair.description);
                        //     descriptions.push(interactionPair.description)
                        // }

                        let interaction = {
                            drugs: drugs,
                            descriptions: descriptions
                        }

                        this.interactions.push(interaction);
                    }
                }

            } else {
                console.log('no interactions');
            }

        });

        // return
    }

    ngOnInit() {
    }

}
