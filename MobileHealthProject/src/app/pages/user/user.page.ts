import { Component, OnInit } from '@angular/core';
import {ApiStorageService} from "../../services/api-storage.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private apiStorageService: ApiStorageService) { }


  getListOfUsers(): UserModel[]{
    return this.apiStorageService.getAllUsers();
  }

  ngOnInit() {
  }

}
