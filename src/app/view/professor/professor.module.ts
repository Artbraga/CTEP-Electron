import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { TabViewModule, MenuModule, PanelModule, AutoCompleteModule, InputTextModule, DialogModule, CalendarModule, ButtonModule, CheckboxModule, GrowlModule, InputTextareaModule, CardModule } from "primeng/primeng";
import { TableModule } from 'primeng/table';
import { FormularioAdicionaProfessorComponent } from "./formulario-inserir-professor/formulario-adiciona-professor.component";
import { MenuProfessorComponent } from "./menu-professor.component";


@NgModule({
    declarations: [
        FormularioAdicionaProfessorComponent,
        MenuProfessorComponent
    ],
    exports: [
        FormularioAdicionaProfessorComponent,
        MenuProfessorComponent,
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
        CardModule,
        AutoCompleteModule
    ],
    providers: [],
})
export class ProfessorModule { }