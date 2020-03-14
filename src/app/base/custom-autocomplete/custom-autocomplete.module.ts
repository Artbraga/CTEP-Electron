import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomAutocompleteComponent } from './custom-autocomplete.component';
import { SharedModule } from '../shared/shared.module';
import { MatAutocompleteModule, MatProgressSpinnerModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CustomAutocompleteComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatAutocompleteModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    exports: [CustomAutocompleteComponent]
})
export class CustomAutocompleteModule { }
