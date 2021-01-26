import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CustomTableComponent } from './custom-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [CustomTableComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        SharedModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatTooltipModule,
        MatSortModule,
        FormsModule
    ],
    exports: [CustomTableComponent]
})
export class CustomTableModule { }
