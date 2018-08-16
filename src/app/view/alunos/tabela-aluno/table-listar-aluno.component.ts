import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from "@angular/core";
import { BaseTable } from "src/app/base/baseTable";
import { AlunoService } from "src/app/service/aluno.service";
import { Coluna } from "src/app/components/table-x/table-x.component";
import { Aluno } from "../../../entities/aluno";

@Component({
    selector: 'table-listar-aluno',
    templateUrl: './table-listar-aluno.component.html',
})
export class TableListarAlunoComponent extends BaseTable implements OnInit {
    
    @Output() carregaAluno = new EventEmitter<any>();

    alunoDelete: Aluno;
    displayAlunoDelete: boolean = false;

    constructor(private alunoService: AlunoService, ref: ChangeDetectorRef){
        super(alunoService, ref);
    }

    ngOnInit(): void {
        this.colunas = <Coluna[]>[
            { header: "Matricula", field: "matricula", style: { 'width': '120px' } },
            { header: "Nome", field: "nome" },
            { header: "Telefone", field: "telefone", style:{'width':'150px'} },
            { header: "Celular", field: "celular", style:{'width':'150px'} },
            { header: "Turma", field: "turma.codigo", style:{'width':'100px'} },
            { bodyTemplateName: "editarAluno", style:{'width':'50px'} },
            { bodyTemplateName: "excluirAluno", style:{'width':'50px'} }
        ];
    }

    edita(matricula: string){
        this.carregaAluno.emit(matricula);
    }
    
    showConfirmationDelete(item){
        this.alunoDelete = item;
        this.displayAlunoDelete = true;
        this.updateView();
    }

    deleteAluno(){
        this.displayAlunoDelete = false;
        this.alunoService.deletar(this.alunoDelete.matricula).subscribe()
    }
}