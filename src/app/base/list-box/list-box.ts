import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';

@Component({
	selector: 'list-box, ons-core-listbox',
	templateUrl: './list-box.html',
	styleUrls: ['./list-box.css']
})
export class ListBox implements OnInit {
	@Input() leftHeader: string;
	@Input() rightHeader: string;
	@Input() left: any[];
	@Input() right: any[];
	@Input() field: string; 
	@Input() maxHeight: string = '50vh';

	@Output() leftChange = new EventEmitter();
	@Output() rightChange = new EventEmitter();
	@Output() buttonClicked = new EventEmitter<any>()

	@ViewChild("firstList", {static: false}) private firstList: MatSelectionList;
	@ViewChild("secondList", {static: false}) private secondList: MatSelectionList;

	constructor() { }

	ngOnInit() {
	}

	allToRight(){
		this.buttonClicked.emit({button: "allToRight", change:this.left });
		this.right = this.right.concat(this.left);
		this.left = [];
	}

	allToLeft(){
		this.buttonClicked.emit({button: "allToLeft", change:this.right });
		this.left = this.left.concat(this.right);
		this.right = [];
	}

	selectedToRight(){
		let selected = this.firstList.selectedOptions.selected.map(x => x.value);
		this.buttonClicked.emit({button: "selectedToRight", change: selected });
		this.right = this.right.concat(selected);
		this.left = this.left.filter(x => selected.indexOf(x) == -1);
		this.firstList.deselectAll();
	}

	selectedToLeft(){
		let selected = this.secondList.selectedOptions.selected.map(x => x.value);
		this.buttonClicked.emit({button: "selectedToLeft", change: selected });
		this.left = this.left.concat(selected);
		this.right = this.right.filter(x => selected.indexOf(x) == -1);
		this.secondList.deselectAll();
	}

	isButtonDisabled(){
		return this.left == null || this.right == null;
	}
}
