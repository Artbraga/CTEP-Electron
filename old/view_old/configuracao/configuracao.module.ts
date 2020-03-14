import { NgModule } from "@angular/core";
import { ConfiguracaoComponent } from "./configuracao.component";
import { FormularioCadastroUsuarioComponent } from './formulario-cadastro-usuario/formulario-cadastro-usuario.component';
import { PanelMenuModule, InputTextModule, PanelModule, BreadcrumbModule, AutoCompleteModule, CardModule, ButtonModule, GrowlModule } from "primeng/primeng";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations:[
        ConfiguracaoComponent,
        FormularioCadastroUsuarioComponent
    ],
    exports: [
        ConfiguracaoComponent
    ],
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
        GrowlModule
    ]
})

export class ConfiguracaoModule{ }