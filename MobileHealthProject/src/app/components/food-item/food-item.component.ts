import {Component, Input, OnInit} from '@angular/core';
import {FoodModel} from "../../models/food.model";

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss'],
})
export class FoodItemComponent implements OnInit {

  @Input() foodItem: FoodModel;

  constructor() { }

  ngOnInit() {}

}
