import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-datetimepicker',
  templateUrl: './custom-datetimepicker.component.html',
  styleUrls: ['./custom-datetimepicker.component.scss']
})
export class CustomDatetimepickerComponent implements OnInit {

  private _value: Date;

  @Input() name: string;

  get value() {
    return this._value;
  }

  @Input()
  set value(x) {
    this.valueChange.emit(x);
    this._value = x;
  }
  
  @Output() valueChange = new EventEmitter();


    constructor() {
    }

  ngOnInit() {
  }

}
