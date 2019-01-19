import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { TabViewModule, MenuModule, PanelModule, AutoCompleteModule, InputTextModule, DialogModule, CalendarModule, ButtonModule, CheckboxModule, GrowlModule, InputTextareaModule, CardModule, RadioButtonModule } from "primeng/primeng";
import { TableModule } from 'primeng/table';

import { FormularioAdicionaAlunoComponent } from "./formulario-adiciona-aluno/formulario-adiciona-aluno.component";
import { TableListarAlunoComponent } from "./tabela-aluno/table-listar-aluno.component";
import { MenuAlunoComponent } from "./menu-aluno.component";
import { TableXModule } from "../../components/table-x/table-x.module";
import { RelatorioAlunoComponent } from './relatorio-aluno/relatorio-aluno.component';

@NgModule({
    declarations: [
        FormularioAdicionaAlunoComponent,
        TableListarAlunoComponent,
        MenuAlunoComponent,
        RelatorioAlunoComponent
    ],
    exports: [
        FormularioAdicionaAlunoComponent,
        TableListarAlunoComponent,
        MenuAlunoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
        PanelModule,
        MenuModule,
        DialogModule,
        TabViewModule,
        InputTextModule,
        InputTextareaModule,
        CalendarModule,
        ButtonModule,
        CheckboxModule,
        GrowlModule,
        TableModule,
        RadioButtonModule,
        TableXModule,
        CardModule,
        AutoCompleteModule
    ],
    providers: [],
})
export class AlunoModule { }