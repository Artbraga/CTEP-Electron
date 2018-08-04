import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { HomeComponent } from './home.component';
import { MenuModule } from 'primeng/menu';
import {TabViewModule} from 'primeng/tabview';
import { AlunoModule } from '../alunos/alunos.module';
import { CommonModule } from '@angular/common';
import { DialogModule, BreadcrumbModule } from 'primeng/primeng';
import { TurmaModule } from '../turma/turma.module';
import { ProfessorModule } from '../professor/professor.module';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    exports: [
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        PanelModule,
        BreadcrumbModule,
        DialogModule,
        MenuModule,
        TabViewModule,
        AlunoModule,
        TurmaModule,
        ProfessorModule,
    ],
    providers: [],
})
export class HomeModule { }