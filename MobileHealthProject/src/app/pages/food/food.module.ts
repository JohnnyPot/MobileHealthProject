import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FoodPageRoutingModule} from './food-routing.module';

import {FoodPage} from './food.page';
import {FoodItemComponent} from "../../components/food-item/food-item.component";
import {MedItemComponent} from "../../components/med-item/med-item.component";
import {MenuHeaderComponent} from "../../components/menu-header/menu-header.component";
import {MenuHeaderModule} from "../../modules/menu-header/menu-header.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FoodPageRoutingModule,
        MenuHeaderModule
    ],
    declarations: [FoodPage, FoodItemComponent]
})
export class FoodPageModule {
}
