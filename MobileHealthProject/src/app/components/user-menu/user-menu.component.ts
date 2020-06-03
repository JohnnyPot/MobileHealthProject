import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../models/user.model";
import {ApiStorageService} from "../../services/api-storage.service";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {

  constructor(private apiStorageService: ApiStorageService) { }

  getUsers(): UserModel[]{
    return this.apiStorageService.getAllUsers();
  }

  ngOnInit() {}

}
