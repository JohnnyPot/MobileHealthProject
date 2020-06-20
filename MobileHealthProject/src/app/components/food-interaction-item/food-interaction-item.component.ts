import {Component, Input, OnInit} from '@angular/core';
import {InteractionModel} from "../../models/interaction.model";
import {FoodInteractionModel} from "../../models/food-interaction.model";

@Component({
  selector: 'app-food-interaction-item',
  templateUrl: './food-interaction-item.component.html',
  styleUrls: ['./food-interaction-item.component.scss'],
})
export class FoodInteractionItemComponent implements OnInit {

  @Input() foodInterItem: FoodInteractionModel;

  hideme: boolean = false;

  getColor(){
    return this.hideme ? 'primary' : '';
  }

  hideFunc(){
    if(this.foodInterItem.description !== ''){
      this.hideme = !this.hideme;
    }
  }

  constructor() { }

  ngOnInit() {}

}
