import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelGeralComponent } from './view/painel-geral/painel-geral.component';
import { AlunoMenuComponent } from './view/aluno/aluno-menu.component';
import { FormularioAlunoComponent } from './view/aluno/formulario-aluno/formulario-aluno.component';
import { TurmaMenuComponent } from './view/turma/turma-menu.component';
import { FormularioTurmaComponent } from './view/turma/formulario-turma/formulario-turma.component';
import { PesquisarAlunoComponent } from './view/aluno/pesquisar-aluno/pesquisar-aluno.component';
import { FichaAlunoComponent } from './view/aluno/ficha-aluno/ficha-aluno.component';
import { PesquisarTurmaComponent } from './view/turma/pesquisar-turma/pesquisar-turma.component';
import { ProfessorMenuComponent } from './view/professor/professor-menu.component';
import { FormularioProfessorComponent } from './view/professor/formulario-professor/formulario-professor.component';
import { TabelaProfessorComponent } from './view/professor/tabela-professor/tabela-professor.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: PainelGeralComponent },
    { path: 'aluno', component: AlunoMenuComponent },
    { path: 'formularioAluno', component: FormularioAlunoComponent, outlet: 'secondRouter' },
    { path: 'pesquisarAluno', component: PesquisarAlunoComponent, outlet: 'secondRouter' },
    { path: 'fichaAluno', component: FichaAlunoComponent, outlet: 'secondRouter' },
    { path: 'turma', component: TurmaMenuComponent },
    { path: 'formularioTurma', component: FormularioTurmaComponent, outlet: 'secondRouter' },
    { path: 'pesquisarTurma', component: PesquisarTurmaComponent, outlet: 'secondRouter' },
    { path: 'professor', component: ProfessorMenuComponent },
    { path: 'tabelaProfessor', component: TabelaProfessorComponent, outlet: 'secondRouter' },
    { path: 'formularioProfessor', component: FormularioProfessorComponent, outlet: 'secondRouter' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
