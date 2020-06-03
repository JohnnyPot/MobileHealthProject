import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {ApiStorageService} from "../../services/api-storage.service";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {

  @Input() userItem: UserModel;

  constructor(private apiStorageService: ApiStorageService) { }

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
