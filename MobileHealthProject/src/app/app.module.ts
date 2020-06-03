import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import {FoodItemComponent} from "./components/food-item/food-item.component";
import { HttpClientModule } from "@angular/common/http";
import { UsersPopupPageModule } from "./pages/users-popup/users-popup.module";
import {FoodPage} from "./pages/food/food.page";
import {UserPage} from "./pages/user/user.page";
import {MenuHeaderComponent} from "./components/menu-header/menu-header.component";
import {MenuHeaderModule} from "./modules/menu-header/menu-header.module";
import {AddUserPopupPage} from "./pages/add-user-popup/add-user-popup.page";
import {AddUserPopupPageModule} from "./pages/add-user-popup/add-user-popup.module";
import {UserMenuComponent} from "./components/user-menu/user-menu.component";
import {UserItemModule} from "./modules/user-item/user-item.module";


@NgModule({
  declarations: [AppComponent, SideMenuComponent, UserMenuComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, UsersPopupPageModule, AddUserPopupPageModule, UserItemModule],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
