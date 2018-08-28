import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from "@angular/core";
import { BaseTable } from "../../../base/baseTable";
import { AlunoService } from "../../../service/aluno.service";
import { Coluna } from "../../../components/table-x/table-x.component";
import { Aluno } from "../../../entities/aluno";
import { Turma } from "../../../entities/turma";
import { TurmaService } from "../../../service/turma.service";

@Component({
    selector: 'table-listar-turma',
    templateUrl: './table-listar-turma.component.html',
})
export class TableListarTurmaComponent extends BaseTable<Turma> implements OnInit {
    
    @Output() carregaTurma = new EventEmitter<any>();

    turmaDelete: Turma;

    constructor(private turmaService: TurmaService, ref: ChangeDetectorRef){
        super(ref);
    }

    ngOnInit(): void {
        this.colunas = <Coluna[]>[
            { header: "Código", field: "codigo", style: { 'width': '120px' } },
            { header: "Dias da Semana", field: "diasDaSemana" },
            { header: "Horário", field: "horario" },
            { header: "Data de Início", field: "dataInicioStr" },
            { header: "Curso", field: "curso.nome" },
            { bodyTemplateName: "editarTurma", style:{'width':'50px'} },
            { bodyTemplateName: "excluirTurma", style:{'width':'50px'} }
        ];
    }

    edita(codigo: string){
        this.carregaTurma.emit(codigo);
    }
    
    showConfirmationDelete(item){
        this.turmaDelete = item;
        this.displayDelete = true;
        this.updateView();
    }

    delete(){
        this.displayDelete = false;
        this.turmaService.deletar(this.turmaDelete.codigo).subscribe()
    }
}