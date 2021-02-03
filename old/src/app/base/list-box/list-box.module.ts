import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ListBox } from './list-box';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [ListBox],
  imports: [
    MatListModule,
    CommonModule,
    MatCommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  exports: [
    ListBox
  ]
})
export class ListBoxModule { }
