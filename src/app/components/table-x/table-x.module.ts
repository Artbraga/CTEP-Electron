import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TableXComponent } from './table-x.component';
import { DomHandler } from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { SortableColumnX } from './SortableColumn';

@NgModule({
    imports: [
        TableModule,
        BrowserModule 
  ],
    declarations: [TableXComponent, SortableColumnX],
    exports: [TableXComponent],
    providers: [DomHandler]
})
export class TableXModule { }
