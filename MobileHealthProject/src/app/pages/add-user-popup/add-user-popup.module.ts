import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUserPopupPageRoutingModule } from './add-user-popup-routing.module';

import { AddUserPopupPage } from './add-user-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddUserPopupPageRoutingModule
  ],
  declarations: [AddUserPopupPage]
})
export class AddUserPopupPageModule {}
