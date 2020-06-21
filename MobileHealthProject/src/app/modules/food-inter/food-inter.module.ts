import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {FoodInteractionItemComponent} from "../../components/food-interaction-item/food-interaction-item.component";



@NgModule({
  declarations: [FoodInteractionItemComponent],
  exports: [FoodInteractionItemComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class FoodInterModule { }
