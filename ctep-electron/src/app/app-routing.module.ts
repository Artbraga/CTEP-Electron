import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelGeralComponent } from './painel-geral/painel-geral.component';
import { AlunoMenuComponent } from './aluno/aluno-menu.component';
import { FormularioAlunoComponent } from './aluno/formulario-aluno/formulario-aluno.component';

const routes: Routes = [
    { path: '', component: PainelGeralComponent },
    { path: 'aluno', component: AlunoMenuComponent },
    { path: 'formularioAluno', component: FormularioAlunoComponent, outlet: 'secondRouter' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {enableTracing: false})],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
