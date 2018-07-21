import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { HomeComponent } from './home.component';
import { MenuModule } from 'primeng/menu';
import {TabViewModule} from 'primeng/tabview';
import { AlunosModule } from '../alunos/alunos.module';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/primeng';

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
        DialogModule,
        MenuModule,
        TabViewModule,
        AlunosModule
    ],
    providers: [],
})
export class HomeModule { }