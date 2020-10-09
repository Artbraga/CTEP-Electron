import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'custom-autocomplete',
    templateUrl: './custom-autocomplete.component.html',
    styleUrls: ['./custom-autocomplete.component.scss']
})
export class CustomAutocompleteComponent implements OnInit {

    MIN_STRING_LENGTH: number = 3;
    isSearching: boolean = false;

    classeInvalido

    @Input() options: any[];
    @Input() field: string;
    private _selected: any;
    @Input() multiple: boolean = false;
    @Input() label: string;
    @Input() style: any;
    @Input() placeholder: string;
    @Input() obrigatorio: boolean;

    @Output() selectedChange = new EventEmitter();
    @Output() select: EventEmitter<any> = new EventEmitter<any>();
    @Output() open: EventEmitter<any> = new EventEmitter<any>();
    @Output() filter: EventEmitter<string> = new EventEmitter<string>();

    @Input() disabled;

    @Input()
    set selected(value) {
        this._selected = value;
        if (value == null) {
            this.inputSearch = "";
        } else {
            this.inputSearch = this._selected[this.field];
        }
    }
    get selected() {
        return this._selected;
    }

    input = document.getElementById("autocompleteInput");
    inputSearch: string = "";
    private searchSub$ = new Subject<string>();

    @Input() compareWith: (o1, o2) => boolean = (o1, o2) => o1 === o2;

    ngOnInit(): void {
        this.searchSub$.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe((value: string) => {
            if (value.length >= this.MIN_STRING_LENGTH) {
                this.isSearching = true;
                this.filter.emit(value);
            } else {
                this.isSearching = false;
                this.options = null;
            }
            this._selected = null;
        });
    }

    onChange(event: MatAutocompleteSelectedEvent) {
        this._selected = event.option.value;
        this.selectedChange.emit(this._selected);
        if (this._selected !== null) {
            this.inputSearch = this._selected[this.field];
        }
    }

    onFilter(value: string) {
        this.searchSub$.next(value);
    }

    displayFn(selected?: any): string | undefined {
        if (typeof selected === 'string') {
            return selected;
        }
        return selected ? selected[this.field] : undefined;
    }

    getLoading(): boolean {
        return this.options !== null || !this.isSearching;
    }

    isEmpty() {
        return this.options != null && this.options.length === 0;
    }

    opened() {
        if (this.inputSearch.length >= this.MIN_STRING_LENGTH) {
            this.onFilter(this.inputSearch);
        }
    }
}
