import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {UserItemComponent} from "../../components/user-item/user-item.component";



@NgModule({
  declarations: [UserItemComponent],
  exports: [UserItemComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class UserItemModule { }
