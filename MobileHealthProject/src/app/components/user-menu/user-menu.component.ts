import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../models/user.model";
import {ApiStorageService} from "../../services/api-storage.service";
import {ModalController} from "@ionic/angular";
import {AddUserPopupPage} from "../../pages/add-user-popup/add-user-popup.page";
import {UsersPopupPage} from "../../pages/users-popup/users-popup.page";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {

  constructor(private apiStorageService: ApiStorageService,
              public modalController: ModalController) { }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddUserPopupPage
    });
    return await modal.present();
  }


  getUsers(): UserModel[]{
    return this.apiStorageService.getAllUsers();
  }

  ngOnInit() {}

}
