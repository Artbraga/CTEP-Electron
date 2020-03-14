import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CustomTableComponent } from './custom-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [CustomTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSortModule,
    FormsModule,
    PipesModule
  ],
  exports: [CustomTableComponent]
})
export class CustomTableModule {}
