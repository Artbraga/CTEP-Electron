import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomSelectComponent } from './custom-select.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
    declarations: [CustomSelectComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        MatProgressSpinnerModule
    ],
    exports: [CustomSelectComponent]
})
export class CustomSelectModule {}
