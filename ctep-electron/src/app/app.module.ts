import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { PainelGeralComponent } from './painel-geral/painel-geral.component';
import { AlunoMenuComponent } from './aluno/aluno-menu.component';
import { FormularioAlunoComponent } from './aluno/formulario-aluno/formulario-aluno.component';
import { CustomDatetimepickerModule } from './custom-components/custom-datetimepicker/custom-datetimepicker.module';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PainelGeralComponent,
        AlunoMenuComponent,
        FormularioAlunoComponent
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
        MatExpansionModule,
        CustomDatetimepickerModule,
        TextMaskModule
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' }
          }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
