import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { TabelaUsuarioComponent } from './tabela-usuario/tabela-usuario.component';
import { UsuariosPerfisComponent } from './usuarios-perfis/usuarios-perfis.component';
import { UsuarioMenuComponent } from './usuario-menu.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';
import { CustomSelectModule } from '../../custom-components/custom-select/custom-select.module';
import { CustomTableModule } from '../../custom-components/custom-table/custom-table.module';
import { SharedModule } from '../../custom-components/shared/shared.module';
import { VincularUsuarioComponent } from './vincular-usuario/vincular-usuario.component';
import { CustomAutocompleteModule } from '../../custom-components/custom-autocomplete/custom-autocomplete.module';

@NgModule({
    declarations: [
        TabelaUsuarioComponent,
        FormularioUsuarioComponent,
        UsuariosPerfisComponent,
        UsuarioMenuComponent,
        VincularUsuarioComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        SharedModule,
        MatRadioModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatExpansionModule,
        CustomTableModule,
        CustomSelectModule,
        CustomAutocompleteModule
    ]
})
export class UsuarioModule { }
