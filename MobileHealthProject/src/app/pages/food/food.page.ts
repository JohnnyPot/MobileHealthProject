import { Component, OnInit } from '@angular/core';
import { ApiStorageService } from "../../services/api-storage.service";

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  constructor(private apiStorageService: ApiStorageService) { }
  // constructor() { }

  getAllFood(){
    return this.apiStorageService.getAllFood()
  }

  ngOnInit() {
  }

}
