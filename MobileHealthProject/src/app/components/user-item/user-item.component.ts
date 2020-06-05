import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {ApiStorageService} from "../../services/api-storage.service";
import {UsersPopupPage} from "../../pages/users-popup/users-popup.page";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {

  @Input() userItem: UserModel;

  constructor(private apiStorageService: ApiStorageService,
              public modalController: ModalController) { }

  async openDetailsModal() {
    const modal = await this.modalController.create({
      component: UsersPopupPage
    });
    return await modal.present();
  }

  availabilityColor(): string {
    return this.userItem.id == this.apiStorageService.getActiveUserId() ? 'primary' : '';
  }

  changeUser() {
    this.apiStorageService.changeUser(this.userItem);
  }

  onDeleteUser() {
    this.apiStorageService.deleteUser(this.userItem.id);
  }

  ngOnInit() {}

}
