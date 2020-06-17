import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicinePopupDetailsPage } from './medicine-popup-details.page';

const routes: Routes = [
  {
    path: '',
    component: MedicinePopupDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicinePopupDetailsPageRoutingModule {}
