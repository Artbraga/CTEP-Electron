import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalComponent } from './hospital/hospital.component';
import { ModalidadeEstagioComponent } from './modalidade-estagio/modalidade-estagio.component';
import { UtilidadesComponent } from './utilidades.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelMenuModule, InputTextModule, AutoCompleteModule, BreadcrumbModule, CardModule, ButtonModule, GrowlModule, DialogModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/panel';
import { TabelaUtilidadesComponent } from './tabela-utilidades/tabela-utilidades.component';
import { TableXModule } from 'src/app/components/table-x/table-x.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
        PanelMenuModule,
        InputTextModule,
        PanelModule,
        AutoCompleteModule,
        BreadcrumbModule,
        CardModule,
        ButtonModule,
        GrowlModule,
        TableXModule,
        DialogModule,
        AutoCompleteModule
    ],
    declarations: [
        HospitalComponent, 
        ModalidadeEstagioComponent, 
        UtilidadesComponent, TabelaUtilidadesComponent
    ],
    exports: [
        UtilidadesComponent
    ]
})

export class UtilidadesModule { }
