import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AboutPageRoutingModule} from './about-routing.module';

import {AboutPage} from './about.page';
import {MedItemComponent} from "../../components/med-item/med-item.component";
import {MenuHeaderComponent} from "../../components/menu-header/menu-header.component";
import {MenuHeaderModule} from "../../modules/menu-header/menu-header.module";
import {UsersPopupPageModule} from "../users-popup/users-popup.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AboutPageRoutingModule,
        MenuHeaderModule
    ],
    declarations: [AboutPage]
})
export class AboutPageModule {
}
