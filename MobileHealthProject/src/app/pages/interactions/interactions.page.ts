import {Component, OnInit, ViewChild} from '@angular/core';
import {MedicineModel} from "../../models/medicine.model";
import {ApiStorageService} from "../../services/api-storage.service";
import {AlertController} from "@ionic/angular";
import {stringify} from "querystring";
import {InteractionModel} from "../../models/interaction.model";
import {IonSlides} from '@ionic/angular';


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
    pageFlag: number = 0;

    @ViewChild('slider', {static: false}) slider: IonSlides;


    changeButtonVal(name: string) {
        this.medButtonFlags[name] = !this.medButtonFlags[name];
    }

    getButtonVal(name: string): string {
        if (this.medButtonFlags[name]) {
            return 'solid';
        } else {
            return 'clear';
        }
    }

    getActiveButtonsNames(): string[] {

        let activeBtns: string[] = []

        // for(let name in this.medButtonFlags){
        for (let med of this.getListOfMeds()) {
            if (this.medButtonFlags[med.name] == true) {
                activeBtns.push(med.name);
            }
        }
        return activeBtns;
    }


    initButtons() {
        this.medButtonFlags = {};

        for (let med of this.getListOfMeds()) {
            this.medButtonFlags[med.name] = true;
        }
    }

    getListOfMeds() {
        return this.apiStorageService.getAllMeds().sort(
            (one, two) => (one.name > two.name ? 1 : -1));
    }

    getInterList() {
        return this.apiStorageService.getInterList();
    }

    getInterFilteredList() {
        return this.apiStorageService.getInterFilteredList(this.getActiveButtonsNames());
    }

    getActiveFoodInterList() {
        // console.log(this.getActiveButtonsNames());
        return this.apiStorageService.getFilteredFoodInter(this.getActiveButtonsNames());
    }

    ngOnInit() {
        this.initButtons();
        // this.interList = this.apiStorageService.getInterList();
    }

    slideChanged() {
        this.pageFlag = (this.pageFlag + 1) % 2;
    }

    getSlideButtonColor(idx: number) {
        return this.pageFlag == idx ? 'solid' : 'clear';
    }

    nextPage(idx: number) {
        this.slider.slideTo(idx);
    }

}

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
