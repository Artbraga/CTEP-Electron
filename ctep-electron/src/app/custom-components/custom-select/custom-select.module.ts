import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from './custom-select.component';
import { MatSelectModule, MatFormFieldModule, MatProgressSpinnerModule } from '@ons/material';



@NgModule({
  declarations: [CustomSelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CustomSelectComponent
  ]
})
export class CustomSelectModule { }
