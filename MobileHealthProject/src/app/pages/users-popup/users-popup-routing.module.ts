import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPopupPage } from './users-popup.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPopupPageRoutingModule {}
