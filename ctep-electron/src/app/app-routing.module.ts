import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelGeralComponent } from './view/painel-geral/painel-geral.component';
import { AlunoMenuComponent } from './view/aluno/aluno-menu.component';
import { FormularioAlunoComponent } from './view/aluno/formulario-aluno/formulario-aluno.component';
import { TurmaMenuComponent } from './view/turma/turma-menu.component';
import { FormularioTurmaComponent } from './view/turma/formulario-turma/formulario-turma.component';
import { TabelaTurmaComponent } from './view/turma/tabela-turma/tabela-turma.component';
import { PesquisarAlunoComponent } from './view/aluno/pesquisar-aluno/pesquisar-aluno.component';
import { FichaAlunoComponent } from './view/aluno/ficha-aluno/ficha-aluno.component';

const routes: Routes = [
    { path: '', component: PainelGeralComponent },
    { path: 'aluno', component: AlunoMenuComponent },
    { path: 'formularioAluno', component: FormularioAlunoComponent, outlet: 'secondRouter' },
    { path: 'pesquisarAluno', component: PesquisarAlunoComponent, outlet: 'secondRouter' },
    { path: 'fichaAluno', component: FichaAlunoComponent, outlet: 'secondRouter' },
    { path: 'turma', component: TurmaMenuComponent },
    { path: 'formularioTurma', component: FormularioTurmaComponent, outlet: 'secondRouter' },
    { path: 'tabelaTurma', component: TabelaTurmaComponent, outlet: 'secondRouter' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {enableTracing: false})],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
