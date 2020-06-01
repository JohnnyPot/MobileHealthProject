import {Component, Input, OnInit} from '@angular/core';
import {FoodModel} from "../../models/food.model";
import {MedicineModel} from "../../models/medicine.model";

@Component({
  selector: 'app-med-item',
  templateUrl: './med-item.component.html',
  styleUrls: ['./med-item.component.scss'],
})
export class MedItemComponent implements OnInit {

  @Input() medItem: MedicineModel;

  constructor() { }

  ngOnInit() {}

}
