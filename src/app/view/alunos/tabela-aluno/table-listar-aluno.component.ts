import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { BaseTable } from "src/app/base/baseTable";
import { AlunoService } from "src/app/service/aluno/aluno.service";
import { Column } from "node_modules/primeng/primeng";

@Component({
    selector: 'table-listar-aluno',
    templateUrl: './table-listar-aluno.component.html',
})
export class TableListarAlunoComponent extends BaseTable implements OnInit {
    
    constructor(alunoService: AlunoService, ref: ChangeDetectorRef){
        super(alunoService, ref);
    }


    ngOnInit(): void {
        this.colunas = [
            { field: 'matricula', header: 'Matricula'},
            { field: 'nome', header: 'Nome'},
            { field: 'telefone', header: 'Telefone'},
            { field: 'celular', header: 'Celular'},
            { field: 'turma.codigo', header: 'Turma'},
        ];
    }

}