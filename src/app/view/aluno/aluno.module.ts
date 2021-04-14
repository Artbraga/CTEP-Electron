import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurmaAlunoComponent } from './turma-aluno/turma-aluno.component';
import { ModalConfirmacaoModule } from '../../custom-components/modal-confirmacao/modal-confirmacao.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CustomAutocompleteModule } from '../../custom-components/custom-autocomplete/custom-autocomplete.module';
import { CustomTableModule } from '../../custom-components/custom-table/custom-table.module';
import { CustomDatetimepickerModule } from '../../custom-components/custom-datetimepicker/custom-datetimepicker.module';
import { CustomSelectModule } from '../../custom-components/custom-select/custom-select.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AlunoMenuComponent } from './aluno-menu.component';
import { FormularioAlunoComponent } from './formulario-aluno/formulario-aluno.component';
import { TabelaAlunoComponent } from './tabela-aluno/tabela-aluno.component';
import { PesquisarAlunoComponent } from './pesquisar-aluno/pesquisar-aluno.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FiltroAlunoComponent } from './filtro-aluno/filtro-aluno.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from '../../app-routing.module';
import { FichaAlunoComponent } from './ficha-aluno/ficha-aluno.component';
import { SharedModule } from 'src/app/custom-components/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegistroAlunoComponent } from './registro-aluno/registro-aluno.component';
import { TransferenciaAlunoComponent } from './transferencia-aluno/transferencia-aluno.component';
import { DirectivesModule } from 'src/directives/directives.module';
import { AlteracaoSituacaoComponent } from './alteracao-situacao/alteracao-situacao.component';
import { CustomPaginatorModule } from '../../custom-components/custom-paginator/custom-paginator.module';
import { NotaAlunoComponent } from './nota-aluno/nota-aluno.component';

@NgModule({
    declarations: [
        AlunoMenuComponent,
        FormularioAlunoComponent,
        TabelaAlunoComponent,
        PesquisarAlunoComponent,
        TurmaAlunoComponent,
        FiltroAlunoComponent,
        FichaAlunoComponent,
        RegistroAlunoComponent,
        TransferenciaAlunoComponent,
        AlteracaoSituacaoComponent,
        NotaAlunoComponent
    ],
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
        MatRadioModule,
        MatSelectModule,
        CustomPaginatorModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatMenuModule,
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatExpansionModule,
        MatInputModule,
        MatIconModule,
        CustomAutocompleteModule,
        ModalConfirmacaoModule,
        DirectivesModule,
        SharedModule
    ]
})
export class AlunoModule { }
