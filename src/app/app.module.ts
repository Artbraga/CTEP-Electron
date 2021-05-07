import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { PainelGeralComponent } from './view/painel-geral/painel-geral.component';
import { HomeComponent } from './view/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingModule } from './custom-components/loading/loading.module';
import { NotificationModule } from './custom-components/notification/notification.module';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpErrorHandleInterceptor } from '../services/interceptors/httpErrorHandlerInterceptor';
import { HttpLoadingInterceptor } from '../services/interceptors/httpLoadingInterceptor';
import { AlunoModule } from './view/aluno/aluno.module';
import { TurmaModule } from './view/turma/turma.module';
import { CalculadoraComponent } from './view/painel-geral/calculadora/calculadora.component';
import { CustomDatetimepickerModule } from './custom-components/custom-datetimepicker/custom-datetimepicker.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ModalConfirmacaoModule } from './custom-components/modal-confirmacao/modal-confirmacao.module';
import { UsuarioModule } from './view/usuario/usuario.module';
import { ProfessorModule } from './view/professor/professor.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PainelGeralComponent,
        ModalLoginComponent,
        CalculadoraComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        HttpClientModule,
        LoadingModule,
        NotificationModule,
        CustomDatetimepickerModule,
        AlunoModule,
        TurmaModule,
        UsuarioModule,
        ProfessorModule,
        ModalConfirmacaoModule,
        TextMaskModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandleInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
    entryComponents: [ModalLoginComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
