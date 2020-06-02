import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MedicinesPageRoutingModule} from './medicines-routing.module';

import {MedicinesPage} from './medicines.page';
import {MedItemComponent} from "../../components/med-item/med-item.component";
import {MenuHeaderComponent} from "../../components/menu-header/menu-header.component";
import {MenuHeaderModule} from "../../modules/menu-header/menu-header.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MedicinesPageRoutingModule,
        MenuHeaderModule
    ],
    declarations: [MedicinesPage, MedItemComponent]
})
export class MedicinesPageModule {
}
