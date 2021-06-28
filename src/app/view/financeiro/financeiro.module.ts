import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaBoletoComponent } from './consulta-boleto/consulta-boleto.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { TabelaBoletoComponent } from './tabela-boleto/tabela-boleto.component';
import { FiltroBoletoComponent } from './filtro-boleto/filtro-boleto.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CustomAutocompleteModule } from 'src/app/custom-components/custom-autocomplete/custom-autocomplete.module';
import { CustomDatetimepickerModule } from 'src/app/custom-components/custom-datetimepicker/custom-datetimepicker.module';
import { CustomSelectModule } from 'src/app/custom-components/custom-select/custom-select.module';
import { CustomTableModule } from 'src/app/custom-components/custom-table/custom-table.module';
import { SharedModule } from 'src/app/custom-components/shared/shared.module';
import { FinanceiroMenuComponent } from './financeiro-menu.component';

@NgModule({
    declarations: [
        FinanceiroMenuComponent,
        ConsultaBoletoComponent, 
        RelatorioComponent, 
        TabelaBoletoComponent, 
        FiltroBoletoComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        SharedModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatDialogModule,
        MatExpansionModule,
        MatDatepickerModule,
        CustomTableModule,
        CustomDatetimepickerModule,
        CustomSelectModule,
        CustomAutocompleteModule,

    ]
})
export class FinanceiroModule { }
