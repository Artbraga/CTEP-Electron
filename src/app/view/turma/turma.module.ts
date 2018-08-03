import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { TabViewModule, MenuModule, PanelModule, AutoCompleteModule, InputTextModule, DialogModule, CalendarModule, ButtonModule, CheckboxModule, GrowlModule, InputTextareaModule, InputMaskModule } from "primeng/primeng";
import { TableModule } from 'primeng/table';
import { FormularioAdicionaTurmaComponent } from "./formulario-adiciona-turma/formulario-adiciona-turma.component";


@NgModule({
    declarations: [
        FormularioAdicionaTurmaComponent
    ],
    exports: [
        FormularioAdicionaTurmaComponent
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
        GrowlModule,
        TableModule,
        AutoCompleteModule,
        InputMaskModule
    ],
    providers: [],
})
export class TurmaModule { }