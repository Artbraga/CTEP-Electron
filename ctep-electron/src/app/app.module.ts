import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import {
    MatFormFieldModule,
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { AppRoutingModule } from "./app-routing.module";
import { CustomDatetimepickerModule } from "./custom-components/custom-datetimepicker/custom-datetimepicker.module";
import { FormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { MatCardModule } from "@angular/material/card";
import { PainelGeralComponent } from "./view/painel-geral/painel-geral.component";
import { HomeComponent } from "./view/home/home.component";
import { AlunoMenuComponent } from "./view/aluno/aluno-menu.component";
import { FormularioAlunoComponent } from "./view/aluno/formulario-aluno/formulario-aluno.component";
import { ViacepService } from 'src/services/ngx-viacep/viacep.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from './custom-components/loading/loading.module';
import { NotificationModule } from './custom-components/notification/notification.module';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PainelGeralComponent,
        AlunoMenuComponent,
        FormularioAlunoComponent,
        ModalLoginComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatExpansionModule,
        CustomDatetimepickerModule,
        TextMaskModule,
        HttpClientModule,
        LoadingModule,
        NotificationModule
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: "outline" },
        },
        ViacepService,
    ],
    entryComponents: [
        ModalLoginComponent
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
