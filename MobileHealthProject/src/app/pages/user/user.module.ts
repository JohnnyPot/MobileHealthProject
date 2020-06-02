import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserPageRoutingModule} from './user-routing.module';

import {UserPage} from './user.page';
import {MedItemComponent} from "../../components/med-item/med-item.component";
import {MenuHeaderComponent} from "../../components/menu-header/menu-header.component";
import {MenuHeaderModule} from "../../modules/menu-header/menu-header.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserPageRoutingModule,
        MenuHeaderModule
    ],
    declarations: [UserPage]
})
export class UserPageModule {
}
