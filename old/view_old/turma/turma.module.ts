import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { TabViewModule, MenuModule, PanelModule, AutoCompleteModule, InputTextModule, DialogModule, CalendarModule, ButtonModule, CheckboxModule, GrowlModule, InputTextareaModule, InputMaskModule, CardModule, PickListModule } from "primeng/primeng";
import { TableModule } from 'primeng/table';
import { FormularioAdicionaTurmaComponent } from "./formulario-adiciona-turma/formulario-adiciona-turma.component";
import { MenuTurmaComponent } from "./menu-turma.component";
import { TableListarTurmaComponent } from "./tabela-turma/table-listar-turma.component";
import { TableXModule } from "../../components/table-x/table-x.module";
import { NotaDisciplinaComponent } from "./nota-disciplina/nota-disciplina.component";


@NgModule({
    declarations: [
        FormularioAdicionaTurmaComponent,
        TableListarTurmaComponent,
        MenuTurmaComponent,
        NotaDisciplinaComponent
    ],
    exports: [
        FormularioAdicionaTurmaComponent,
        TableListarTurmaComponent,
        MenuTurmaComponent,
        NotaDisciplinaComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        PanelModule,
        MenuModule,
        DialogModule,
        TabViewModule,
        InputTextModule,
        InputTextareaModule,
        CalendarModule,
        ButtonModule,
        GrowlModule,
        TableModule,
        AutoCompleteModule,
        InputMaskModule,
        CardModule,
        TableXModule,
        PickListModule
    ],
    providers: [],
})
export class TurmaModule { }