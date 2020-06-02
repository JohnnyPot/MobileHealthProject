import {Component, Input, OnInit} from '@angular/core';
import {ApiStorageService} from "../../services/api-storage.service";
import {AlertController, ModalController} from "@ionic/angular";
import {UsersPopupPage} from "../../pages/users-popup/users-popup.page";

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {

  @Input() header_title: string

  constructor(public modalController: ModalController) { }

  async openModal() {
    const modal = await this.modalController.create({
      component: UsersPopupPage
    });
    return await modal.present();
  }

  ngOnInit() {}

}
