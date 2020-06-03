import {Component, Input, OnInit} from '@angular/core';
import {InteractionModel} from "../../models/interaction.model";

@Component({
  selector: 'app-interaction-item',
  templateUrl: './interaction-item.component.html',
  styleUrls: ['./interaction-item.component.scss'],
})
export class InteractionItemComponent implements OnInit {

  @Input() interItem: InteractionModel;

  hideme: boolean = false;

  getColor(){
    return this.hideme ? 'primary' : '';
  }

  hideFunc(){
    this.hideme = !this.hideme;
  }

  constructor() { }

  ngOnInit() {}

}
