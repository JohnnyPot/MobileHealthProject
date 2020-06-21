import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MedicinePopupDetailsPageRoutingModule} from './medicine-popup-details-routing.module';

import {MedicinePopupDetailsPage} from './medicine-popup-details.page';
import {FoodInterModule} from "../../modules/food-inter/food-inter.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MedicinePopupDetailsPageRoutingModule,
        FoodInterModule
    ],
    declarations: [MedicinePopupDetailsPage]
})
export class MedicinePopupDetailsPageModule {
}
