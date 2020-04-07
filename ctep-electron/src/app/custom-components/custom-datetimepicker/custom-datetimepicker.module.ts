import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatetimepickerComponent } from './custom-datetimepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [CustomDatetimepickerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  exports: [
    CustomDatetimepickerComponent
  ]
})
export class CustomDatetimepickerModule { }
