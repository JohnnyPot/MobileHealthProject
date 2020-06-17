import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'medicines',
    loadChildren: () => import('./pages/medicines/medicines.module').then( m => m.MedicinesPageModule)
  },
  {
    path: 'interactions',
    loadChildren: () => import('./pages/interactions/interactions.module').then( m => m.InteractionsPageModule)
  },
  {
    path: 'food',
    loadChildren: () => import('./pages/food/food.module').then( m => m.FoodPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'users-popup',
    loadChildren: () => import('./pages/users-popup/users-popup.module').then( m => m.UsersPopupPageModule)
  },
  {
    path: 'add-user-popup',
    loadChildren: () => import('./pages/add-user-popup/add-user-popup.module').then( m => m.AddUserPopupPageModule)
  },
  {
    path: 'medicine-popup-details',
    loadChildren: () => import('./pages/medicine-popup-details/medicine-popup-details.module').then( m => m.MedicinePopupDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
