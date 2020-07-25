import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatetimepickerComponent } from './custom-datetimepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, NativeDateAdapter, MatDateFormats, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { TextMaskModule } from 'angular2-text-mask';

export class AppDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: any): string {
        if (displayFormat === 'input') {
            let day: string = date.getDate().toString();
            day = +day < 10 ? '0' + day : day;
            let month: string = (date.getMonth() + 1).toString();
            month = +month < 10 ? '0' + month : month;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return date.toDateString();
    }
}
const CUSTOM_FORMAT = MAT_MOMENT_DATE_FORMATS;
CUSTOM_FORMAT.parse.dateInput = 'L';
CUSTOM_FORMAT.display.dateInput = 'L';

@NgModule({
    declarations: [CustomDatetimepickerComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatMomentDateModule,
        FormsModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMAT },
    ],
    exports: [
        CustomDatetimepickerComponent
    ]
})
export class CustomDatetimepickerModule { }
