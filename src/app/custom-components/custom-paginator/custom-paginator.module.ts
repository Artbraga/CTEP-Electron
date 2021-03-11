import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomPaginatorComponent } from './custom-paginator.component';

@NgModule({
    declarations: [CustomPaginatorComponent],
    imports: [
        CommonModule,
        MatPaginatorModule
    ],
    exports: [CustomPaginatorComponent]
})
export class CustomPaginatorModule { }
