import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUserPopupPage } from './add-user-popup.page';

const routes: Routes = [
  {
    path: '',
    component: AddUserPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUserPopupPageRoutingModule {}
