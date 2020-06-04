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
    medButtonFlags: {} = {};

    // getGridOfMeds() {
    //     const numberOfCols = 3;
    //     let rows = [];
    //     let curRow = [];
    //     let curCol = 0;
    //
    //     for(let med of this.apiStorageService.getAllMeds()){
    //
    //         if(curCol == numberOfCols) {
    //             console.log(curRow);
    //             rows.push(curRow);
    //             curRow = [];
    //             curCol = 0;
    //         }
    //
    //         console.log(med.name);
    //         curRow.push(med);
    //         curCol++;
    //     }
    //
    //     if(curRow.length > 0){
    //         rows.push(curRow);
    //     }
    //
    //     return rows;
    // }

    changeButtonVal(name: string) {
        this.medButtonFlags[name] = !this.medButtonFlags[name];
    }

    getButtonVal(name: string): string {
        if(this.medButtonFlags[name]){
            return 'solid';
        }else{
            return 'outline';
        }
    }


    initButtons(){
        for(let med of this.getListOfMeds()){
            this.medButtonFlags[med.name] = true;
        }
    }

    getListOfMeds(){
        return this.apiStorageService.getAllMeds();
    }

    getInteractions() {

        this.interactions = [];
        let interaction_drugRxcuis = '';
        const medList = this.apiStorageService.getAllMeds();

        // let med of this.apiStorageService.getAllMeds()
        for (let i = 0; i < medList.length; i++) {
            if (i < medList.length - 1) {
                interaction_drugRxcuis = interaction_drugRxcuis.concat(medList[i].rxnormId.toString() + '+')
            } else {
                interaction_drugRxcuis = interaction_drugRxcuis.concat(medList[i].rxnormId.toString())
            }
            // console.log(medList[i].rxnormId.toString() + ' - edw');
        }
        // console.log(interaction_list + ' oli i lista');

        this.apiStorageService.getInteractions(interaction_drugRxcuis).subscribe(interactionJson => {

            console.log(interactionJson);

            if (interactionJson.hasOwnProperty('fullInteractionTypeGroup')) {
                // console.log('Bravo');
                // console.log(interactionJson.fullInteractionTypeGroup.fullInteractionType)

                for (let InteractionTypeGroup of interactionJson.fullInteractionTypeGroup) {
                    console.log('interaction Group: ' + InteractionTypeGroup.fullInteractionType);

                    for (let InteractionType of InteractionTypeGroup.fullInteractionType) {
                        console.log('interaction Type: ' + InteractionType);

                        let drugs = []

                        for (let drug of InteractionType.minConcept) {
                            console.log('Drug`s name: ' + drug.name);
                            drugs.push(drug.name)
                        }

                        // for (let drug of InteractionType.interactionPair[0].interactionConcept) {
                        //     console.log('Drug`s name: ' + drug.minConceptItem.name);
                        //     drugs.push(drug.minConceptItem.name)
                        // }

                        console.log('Description: ' + InteractionType.interactionPair.description);

                        let interaction = {
                            drugs: drugs,
                            description: InteractionType.interactionPair[0].description
                        }

                        this.interactions.push(interaction);
                    }
                }
            } else {
                console.log('no interactions');
            }
        });

    }

    ngOnInit() {
        this.initButtons();
        this.getInteractions();
    }

}
