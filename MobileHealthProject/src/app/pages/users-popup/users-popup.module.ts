import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPopupPageRoutingModule } from './users-popup-routing.module';

import { UsersPopupPage } from './users-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPopupPageRoutingModule
  ],
  declarations: [UsersPopupPage]
})
export class UsersPopupPageModule {}
