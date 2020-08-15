import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomAutocompleteComponent } from './custom-autocomplete.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

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
