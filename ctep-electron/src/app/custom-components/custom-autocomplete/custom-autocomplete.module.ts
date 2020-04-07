import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomAutocompleteComponent } from './custom-autocomplete.component';
import { SharedModule } from '../shared/shared.module';
import { MatAutocompleteModule, MatProgressSpinnerModule, MatInputModule, MatFormFieldModule } from '@ons/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CustomAutocompleteComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatAutocompleteModule,
        FormsModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    exports: [CustomAutocompleteComponent]
})
export class CustomAutocompleteModule { }
