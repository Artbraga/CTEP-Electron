import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorMenuComponent } from './professor-menu.component';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';
import { CustomAutocompleteModule } from '../../custom-components/custom-autocomplete/custom-autocomplete.module';
import { CustomDatetimepickerModule } from '../../custom-components/custom-datetimepicker/custom-datetimepicker.module';
import { CustomPaginatorModule } from '../../custom-components/custom-paginator/custom-paginator.module';
import { CustomSelectModule } from '../../custom-components/custom-select/custom-select.module';
import { CustomTableModule } from '../../custom-components/custom-table/custom-table.module';
import { ModalConfirmacaoModule } from '../../custom-components/modal-confirmacao/modal-confirmacao.module';
import { SharedModule } from '../../custom-components/shared/shared.module';
import { TabelaProfessorComponent } from './tabela-professor/tabela-professor.component';
import { FormularioProfessorComponent } from './formulario-professor/formulario-professor.component';



@NgModule({
    declarations: [ProfessorMenuComponent, TabelaProfessorComponent, FormularioProfessorComponent],
    imports: [
        AppRoutingModule,
        CommonModule,
        TextMaskModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CustomTableModule,
        CustomDatetimepickerModule,
        CustomSelectModule,
        CustomPaginatorModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatExpansionModule,
        MatInputModule,
        MatIconModule,
        CustomAutocompleteModule,
        ModalConfirmacaoModule,
        SharedModule
    ]
})
export class ProfessorModule { }
