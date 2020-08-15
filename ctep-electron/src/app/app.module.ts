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
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { CustomDatetimepickerModule } from './custom-components/custom-datetimepicker/custom-datetimepicker.module';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PainelGeralComponent } from './view/painel-geral/painel-geral.component';
import { HomeComponent } from './view/home/home.component';
import { AlunoMenuComponent } from './view/aluno/aluno-menu.component';
import { FormularioAlunoComponent } from './view/aluno/formulario-aluno/formulario-aluno.component';
import { ViacepService } from 'src/services/ngx-viacep/viacep.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingModule } from './custom-components/loading/loading.module';
import { NotificationModule } from './custom-components/notification/notification.module';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TurmaMenuComponent } from './view/turma/turma-menu.component';
import { FormularioTurmaComponent } from './view/turma/formulario-turma/formulario-turma.component';
import { TabelaTurmaComponent } from './view/turma/tabela-turma/tabela-turma.component';
import { CustomTableModule } from './custom-components/custom-table/custom-table.module';
import { SharedModule } from './custom-components/shared/shared.module';
import { HttpErrorHandleInterceptor } from '../services/interceptors/httpErrorHandlerInterceptor';
import { CustomSelectModule } from './custom-components/custom-select/custom-select.module';
import { ModalConfirmacaoModule } from './custom-components/modal-confirmacao/modal-confirmacao.module';
import { HttpLoadingInterceptor } from '../services/interceptors/httpLoadingInterceptor';
import { TabelaAlunoComponent } from './view/aluno/tabela-aluno/tabela-aluno.component';
import { PesquisarAlunoComponent } from './view/aluno/pesquisar-aluno/pesquisar-aluno.component';
import { FiltroAlunoComponent } from './view/aluno/filtro-aluno/filtro-aluno.component';
import { CustomAutocompleteModule } from './custom-components/custom-autocomplete/custom-autocomplete.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PainelGeralComponent,
        AlunoMenuComponent,
        FormularioAlunoComponent,
        TurmaMenuComponent,
        FormularioTurmaComponent,
        ModalLoginComponent,
        TabelaTurmaComponent,
        TabelaAlunoComponent,
        PesquisarAlunoComponent,
        FiltroAlunoComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        CustomTableModule,
        SharedModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTabsModule,
        MatTooltipModule,
        MatRadioModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatExpansionModule,
        CustomDatetimepickerModule,
        CustomSelectModule,
        CustomAutocompleteModule,
        TextMaskModule,
        HttpClientModule,
        LoadingModule,
        NotificationModule,
        ModalConfirmacaoModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandleInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: "outline" },
        },
        ViacepService,
    ],
    entryComponents: [ModalLoginComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
