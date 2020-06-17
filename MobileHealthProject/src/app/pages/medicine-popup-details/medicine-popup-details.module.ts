import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicinePopupDetailsPageRoutingModule } from './medicine-popup-details-routing.module';

import { MedicinePopupDetailsPage } from './medicine-popup-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicinePopupDetailsPageRoutingModule
  ],
  declarations: [MedicinePopupDetailsPage]
})
export class MedicinePopupDetailsPageModule {}
