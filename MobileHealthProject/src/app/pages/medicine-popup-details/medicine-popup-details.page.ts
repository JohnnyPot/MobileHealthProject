import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-medicine-popup-details',
  templateUrl: './medicine-popup-details.page.html',
  styleUrls: ['./medicine-popup-details.page.scss'],
})
export class MedicinePopupDetailsPage implements OnInit {

  constructor(public viewCtrl: ModalController) { }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
  }

}
