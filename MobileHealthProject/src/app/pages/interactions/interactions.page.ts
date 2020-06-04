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

    // interList: InteractionModel[] = [];
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
            return 'clear';
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

    getInterList() {
        return this.apiStorageService.getInterList();
    }

    ngOnInit() {
        this.initButtons();
        // this.interList = this.apiStorageService.getInterList();
    }

}
