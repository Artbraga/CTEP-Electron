import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { TabViewModule, MenuModule, PanelModule, AutoCompleteModule, InputTextModule, DialogModule, CalendarModule, ButtonModule, CheckboxModule, GrowlModule, InputTextareaModule, CardModule } from "primeng/primeng";
import { TableModule } from 'primeng/table';

import { FormularioAdicionaAlunoComponent } from "./formulario-adiciona-aluno/formulario-adiciona-aluno.component";
import { TableListarAlunoComponent } from "./tabela-aluno/table-listar-aluno.component";
import { MenuAlunoComponent } from "./menu-aluno.component";
import { TableXModule } from "../../components/table-x/table-x.module";

@NgModule({
    declarations: [
        FormularioAdicionaAlunoComponent,
        TableListarAlunoComponent,
        MenuAlunoComponent
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
        TableXModule,
        CardModule,
        AutoCompleteModule
    ],
    providers: [],
})
export class AlunoModule { }