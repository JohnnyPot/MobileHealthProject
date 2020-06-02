import { Component, OnInit } from '@angular/core';
import {ApiStorageService} from "../../services/api-storage.service";
import {ModalController} from "@ionic/angular";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-users-popup',
  templateUrl: './users-popup.page.html',
  styleUrls: ['./users-popup.page.scss'],
})
export class UsersPopupPage implements OnInit {


  constructor(private apiStorageService: ApiStorageService,
              public viewCtrl: ModalController) { }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getListOfUsers(): UserModel[]{
    return this.apiStorageService.getAllUsers();
  }

  ngOnInit() {
  }

}
