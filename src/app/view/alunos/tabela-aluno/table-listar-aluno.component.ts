import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from "@angular/core";
import { BaseTable } from "src/app/base/baseTable";
import { AlunoService } from "src/app/service/aluno.service";
import { Coluna } from "src/app/components/table-x/table-x.component";

@Component({
    selector: 'table-listar-aluno',
    templateUrl: './table-listar-aluno.component.html',
})
export class TableListarAlunoComponent extends BaseTable implements OnInit {
    
    @Output() carregaAluno = new EventEmitter<any>();
    constructor(alunoService: AlunoService, ref: ChangeDetectorRef){
        super(alunoService, ref);
    }

    ngOnInit(): void {
        this.colunas = <Coluna[]>[
            { header: "Matricula", field: "matricula", sortable: true, style: { 'width': '120px' } },
            { header: "Nome", field: "nome", sortable: true },
            { header: "Telefone", field: "telefone", sortable: true },
            { header: "Celular", field: "celular", sortable: true },
            { header: "Turma", field: "turma.codigo", sortable: true },
            { bodyTemplateName: "editarAluno" }
        ];
    }

    edita(matricula: string){
        this.carregaAluno.emit(matricula);
    }
    
}