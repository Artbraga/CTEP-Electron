import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PainelGeralComponent } from "./view/painel-geral/painel-geral.component";
import { AlunoMenuComponent } from "./view/aluno/aluno-menu.component";
import { FormularioAlunoComponent } from "./view/aluno/formulario-aluno/formulario-aluno.component";
import { TurmaMenuComponent } from "./view/turma/turma-menu.component";
import { FormularioTurmaComponent } from "./view/turma/formulario-turma/formulario-turma.component";
import { PesquisarAlunoComponent } from "./view/aluno/pesquisar-aluno/pesquisar-aluno.component";
import { FichaAlunoComponent } from "./view/aluno/ficha-aluno/ficha-aluno.component";
import { PesquisarTurmaComponent } from "./view/turma/pesquisar-turma/pesquisar-turma.component";
import { UsuarioMenuComponent } from "./view/usuario/usuario-menu.component";
import { FormularioUsuarioComponent } from "./view/usuario/formulario-usuario/formulario-usuario.component";
import { ProfessorMenuComponent } from "./view/professor/professor-menu.component";
import { FormularioProfessorComponent } from "./view/professor/formulario-professor/formulario-professor.component";
import { TabelaProfessorComponent } from "./view/professor/tabela-professor/tabela-professor.component";
import { TabelaUsuarioComponent } from "./view/usuario/tabela-usuario/tabela-usuario.component";
import { FinanceiroMenuComponent } from "./view/financeiro/financeiro-menu.component";
import { ConsultaBoletoComponent } from "./view/financeiro/consulta-boleto/consulta-boleto.component";
import { AdicionarBoletoComponent } from "./view/financeiro/adicionar-boleto/adicionar-boleto.component";
import {
    AdicionarBoletoRoute,
    ConsultaBoletoRoute,
    CursoLivreRoute,
    FichaAlunoRoute,
    FormularioAlunoRoute,
    FormularioProfessorRoute,
    FormularioTurmaCursoLivreRoute,
    FormularioTurmaRoute,
    FormularioUsuarioRoute,
    ListarRetornoRoute,
    NotasTurmaRoute,
    PesquisarAlunoRoute,
    PesquisarTurmaRoute,
    ProcessarRetornoRoute,
    RelatorioFinanceiroRoute,
    TabelaProfessorRoute,
    TabelaUsuarioRoute,
} from "src/model/enums/constants";
import { NotasTurmaComponent } from "./view/turma/notas-turma/notas-turma.component";
import { CursoLivreComponent } from "./view/turma/curso-livre/curso-livre.component";
import { FormularioTurmaCursoLivreComponent } from "./view/turma/curso-livre/formulario-turma-curso-livre/formulario-turma-curso-livre.component";
import { ProcessaRetornoComponent } from "./view/financeiro/processa-retorno/processa-retorno.component";
import { ConsultaRetornoComponent } from "./view/financeiro/consulta-retorno/consulta-retorno.component";
import { RelatorioComponent } from "./view/financeiro/relatorio/relatorio.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: PainelGeralComponent },
    { path: "aluno", component: AlunoMenuComponent },
    {
        path: FormularioAlunoRoute,
        component: FormularioAlunoComponent,
        outlet: "secondRouter",
    },
    {
        path: PesquisarAlunoRoute,
        component: PesquisarAlunoComponent,
        outlet: "secondRouter",
    },
    {
        path: FichaAlunoRoute,
        component: FichaAlunoComponent,
        outlet: "secondRouter",
    },
    { path: "turma", component: TurmaMenuComponent },
    {
        path: FormularioTurmaRoute,
        component: FormularioTurmaComponent,
        outlet: "secondRouter",
    },
    {
        path: PesquisarTurmaRoute,
        component: PesquisarTurmaComponent,
        outlet: "secondRouter",
    },
    {
        path: NotasTurmaRoute,
        component: NotasTurmaComponent,
        outlet: "secondRouter",
    },
    { path: "usuario", component: UsuarioMenuComponent },
    {
        path: TabelaUsuarioRoute,
        component: TabelaUsuarioComponent,
        outlet: "secondRouter",
    },
    {
        path: FormularioUsuarioRoute,
        component: FormularioUsuarioComponent,
        outlet: "secondRouter",
    },
    { path: "professor", component: ProfessorMenuComponent },
    {
        path: TabelaProfessorRoute,
        component: TabelaProfessorComponent,
        outlet: "secondRouter",
    },
    {
        path: FormularioProfessorRoute,
        component: FormularioProfessorComponent,
        outlet: "secondRouter",
    },
    { path: "financeiro", component: FinanceiroMenuComponent },
    {
        path: ConsultaBoletoRoute,
        component: ConsultaBoletoComponent,
        outlet: "secondRouter",
    },
    {
        path: AdicionarBoletoRoute,
        component: AdicionarBoletoComponent,
        outlet: "secondRouter",
    },
    {
        path: ProcessarRetornoRoute,
        component: ProcessaRetornoComponent,
        outlet: "secondRouter",
    },
    {
        path: ListarRetornoRoute,
        component: ConsultaRetornoComponent,
        outlet: "secondRouter",
    },
    {
        path: RelatorioFinanceiroRoute,
        component: RelatorioComponent,
        outlet: "secondRouter",
    },
    {
        path: "tabelaProfessor",
        component: TabelaProfessorComponent,
        outlet: "secondRouter",
    },
    {
        path: "formularioProfessor",
        component: FormularioProfessorComponent,
        outlet: "secondRouter",
    },
    {
        path: CursoLivreRoute,
        component: CursoLivreComponent,
        outlet: "secondRouter",
    },
    {
        path: FormularioTurmaCursoLivreRoute,
        component: FormularioTurmaCursoLivreComponent,
        outlet: "secondRouter",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
