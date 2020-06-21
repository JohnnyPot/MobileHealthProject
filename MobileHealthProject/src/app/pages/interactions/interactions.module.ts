import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {InteractionsPageRoutingModule} from './interactions-routing.module';

import {InteractionsPage} from './interactions.page';
import {MenuHeaderModule} from "../../modules/menu-header/menu-header.module";
import {InteractionItemComponent} from "../../components/interaction-item/interaction-item.component";
import {FoodInteractionItemComponent} from "../../components/food-interaction-item/food-interaction-item.component";
import {FoodInterModule} from "../../modules/food-inter/food-inter.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InteractionsPageRoutingModule,
        MenuHeaderModule,
        FoodInterModule
    ],
    declarations: [InteractionsPage, InteractionItemComponent]
})
export class InteractionsPageModule {
}
