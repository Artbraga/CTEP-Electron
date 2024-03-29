import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurmaMenuComponent } from './turma-menu.component';
import { FormularioTurmaComponent } from './formulario-turma/formulario-turma.component';
import { TabelaTurmaComponent } from './tabela-turma/tabela-turma.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../custom-components/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomTableModule } from '../../custom-components/custom-table/custom-table.module';
import { CustomDatetimepickerModule } from '../../custom-components/custom-datetimepicker/custom-datetimepicker.module';
import { CustomSelectModule } from '../../custom-components/custom-select/custom-select.module';
import { CustomAutocompleteModule } from '../../custom-components/custom-autocomplete/custom-autocomplete.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AppRoutingModule } from '../../app-routing.module';
import { PesquisarTurmaComponent } from './pesquisar-turma/pesquisar-turma.component';
import { FiltroTurmaComponent } from './filtro-turma/filtro-turma.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegistroTurmaComponent } from './registro-turma/registro-turma.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { FinalizarTurmaComponent } from './finalizar-turma/finalizar-turma.component';
import { TurmaProfessorComponent } from './turma-professor/turma-professor.component';
import { NotasTurmaComponent } from './notas-turma/notas-turma.component';
import { AdicionarNotaComponent } from './notas-turma/adicionar-nota/adicionar-nota.component';
import { CursoLivreComponent } from './curso-livre/curso-livre.component';
import { FormularioTurmaCursoLivreComponent } from './curso-livre/formulario-turma-curso-livre/formulario-turma-curso-livre.component';
import { FormularioAlunoCursoLivreComponent } from './curso-livre/formulario-aluno-curso-livre/formulario-aluno-curso-livre.component';

@NgModule({
    declarations: [
        TurmaMenuComponent,
        FormularioTurmaComponent,
        TabelaTurmaComponent,
        PesquisarTurmaComponent,
        FiltroTurmaComponent,
        RegistroTurmaComponent,
        FinalizarTurmaComponent,
        TurmaProfessorComponent,
        NotasTurmaComponent,
        AdicionarNotaComponent,
        CursoLivreComponent,
        FormularioTurmaCursoLivreComponent,
        FormularioAlunoCursoLivreComponent,
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
        TextMaskModule,
    ]
})
export class TurmaModule { }
