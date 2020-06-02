import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuHeaderComponent} from "../../components/menu-header/menu-header.component";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    MenuHeaderComponent
  ],
  exports: [
    MenuHeaderComponent
  ]
})
export class MenuHeaderModule { }
