import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { HomeComponent } from './home.component';
import { MenuModule } from 'primeng/menu';
import {TabViewModule} from 'primeng/tabview';
import { AlunoModule } from '../alunos/alunos.module';
import { CommonModule } from '@angular/common';
import { DialogModule, BreadcrumbModule, GrowlModule, ButtonModule } from 'primeng/primeng';
import { TurmaModule } from '../turma/turma.module';
import { ProfessorModule } from '../professor/professor.module';
import { TableXModule } from '../../components/table-x/table-x.module';
import { FormsModule } from '@angular/forms';
import { ConfiguracaoModule } from '../configuracao/configuracao.module';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    exports: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        PanelModule,
        BreadcrumbModule,
        DialogModule,
        TableXModule,
        MenuModule,
        TabViewModule,
        AlunoModule,
        ConfiguracaoModule,
        TurmaModule,
        ProfessorModule,
        ButtonModule,
        GrowlModule
    ],
    providers: [],
})
export class HomeModule { }