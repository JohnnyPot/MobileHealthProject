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

  private UserName: string;
  private  UserMedCondition: string;

  constructor(private apiStorageService: ApiStorageService,
              public viewCtrl: ModalController) { }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  // getListOfUsers(): UserModel[]{
  //   return this.apiStorageService.getAllUsers();
  // }

  setInitName(): void {
    let activeUserIdx = this.apiStorageService.getActiveUserId();
    this.UserName = this.apiStorageService.getAllUsers()[activeUserIdx].name;
  }


  saveNewName(){
    this.apiStorageService.editUserName(this.UserName);
  }


  ngOnInit() {
    this.setInitName();
  }

}
