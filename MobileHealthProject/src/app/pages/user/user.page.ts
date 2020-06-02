import { Component, OnInit } from '@angular/core';
import {ApiStorageService} from "../../services/api-storage.service";
import {UserModel} from "../../models/user.model";
import {AlertController, ModalController} from "@ionic/angular";
import {UsersPopupPage} from "../users-popup/users-popup.page";
import {AddUserPopupPage} from "../add-user-popup/add-user-popup.page";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  private listOfUsers;

  constructor(private apiStorageService: ApiStorageService,
              private alertCtrl: AlertController,
              public modalController: ModalController) { }


  async openModal() {
    const modal = await this.modalController.create({
      component: AddUserPopupPage
    });
    return await modal.present();
  }

  onSubmit(name: string): void{
        if(this.apiStorageService.checkUser(name)){
          this.apiStorageService.addUser(name);
        }else{
          this.alertCtrl.create({
            header: 'Warning',
            message: 'This med there is already in your list ',
            buttons: [{
              text: 'Ok',
              role: 'Okay'
            }]
          }).then(alertEl => {
            alertEl.present();
          });
        }
  }

  ionViewWillEnter() {
    this.listOfUsers = this.apiStorageService.getAllUsers();
  }


  getListOfUsers(): UserModel[]{
    return this.apiStorageService.getAllUsers();
  }

  ngOnInit() {
  }

}
