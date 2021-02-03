import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'custom-autocomplete',
    templateUrl: './custom-autocomplete.component.html',
    styleUrls: ['./custom-autocomplete.component.scss']
})
export class CustomAutocompleteComponent implements OnInit {

    MIN_STRING_LENGTH = 3;
    isSearching = false;

    myControl = new FormControl();

    classeInvalido;

    @Input() options: any[];
    @Input() field: string;
    private _selected: any;
    @Input() multiple = false;
    @Input() label: string;
    @Input() style: any;
    @Input() placeholder: string;

    @Input() obrigatorio: boolean;
    @Output() selectedChange = new EventEmitter();
    @Output() select: EventEmitter<any> = new EventEmitter<any>();
    @Output() open: EventEmitter<any> = new EventEmitter<any>();
    @Output() filter: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    set disabled(value) {
        value ? this.myControl.disable() : this.myControl.enable();
    }

    @Input()
    set selected(value) {
        this._selected = value;
        if (value != null) {
            this.inputSearch = this._selected[this.field];
        } else if (value == null) {
            this.inputSearch = '';
        }
    }
    get selected() {
        return this._selected;
    }

    input = document.getElementById('autocompleteInput');
    inputSearch = '';
    private searchSub$ = new Subject<string>();

    @Input() compareWith: (o1, o2) => boolean = (o1, o2) => o1 === o2;

    ngOnInit(): void {
        this.myControl.valueChanges.pipe(
            startWith(''),
            map((value: string) => this.filter.emit(value))
        );

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
            if (this._selected != null && this.inputSearch !== this._selected[this.field]) {
                this._selected = null;
            }
            if (this.inputSearch.trim() == '' || this.inputSearch.trim() == null) {
                this._selected = null;
                this.selectedChange.emit(this._selected);
            }
        });
    }

    onChange(event: MatAutocompleteSelectedEvent) {
        this._selected = event.option.value;
        this.selectedChange.emit(this._selected);
        if (this._selected !== null) {
            this.inputSearch = this._selected[this.field];
            this.campoInvalido();
        }
    }


    campoInvalido() {
        if (this.obrigatorio) {
            if (!this._selected) {
                this.classeInvalido = { 'mat-form-field-invalid': true, 'mat-form-field-outline-end': true };
                return true;
            } else {
                this.classeInvalido = { 'mat-form-field-invalid': false, 'mat-form-field-outline-end': false };
                return false;
            }
        }
    }

    onFilter(value: string) {
        this.searchSub$.next(value);
    }

    displayFn(selected?: any): string | undefined {
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
