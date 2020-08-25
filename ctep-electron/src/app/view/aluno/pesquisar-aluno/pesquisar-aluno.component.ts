import { Component, OnInit } from "@angular/core";
import { Aluno } from 'src/model/aluno.model';
import { AlunoService } from 'src/services/aluno.service';
import { FiltroAluno } from 'src/model/filters/aluno.filter';

@Component({
    selector: "pesquisar-aluno",
    templateUrl: "./pesquisar-aluno.component.html",
    styleUrls: ["./pesquisar-aluno.component.scss"],
})
export class PesquisarAlunoComponent implements OnInit {
    filtro: FiltroAluno;
    list: Aluno[];
    constructor(private alunoService: AlunoService) {}

    ngOnInit(): void {}

    pesquisar(filtro: FiltroAluno = null) {
        if (filtro != null) {
            this.filtro = filtro;
        }
        this.alunoService.pesquisarAlunos(this.filtro).subscribe(data => {
            this.list = data.map(x => Object.assign(new Aluno(), x));
        })
    }
}
