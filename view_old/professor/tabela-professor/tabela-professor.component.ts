import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { BaseTable } from 'src/app/base/base-table';
import { Professor } from 'src/app/entities/professor';
import { ProfessorService } from 'src/app/service/professor.service';
import { Coluna } from 'src/app/components/table-x/table-x.component';

@Component({
  selector: 'tabela-professor',
  templateUrl: './tabela-professor.component.html',
})
export class TabelaProfessorComponent extends BaseTable<Professor> implements OnInit {

    constructor(private professorService: ProfessorService, ref: ChangeDetectorRef){
        super(ref);
    }

    @Output() carregaProfessor = new EventEmitter<any>();

    professorDelete: Professor;

    ngOnInit(): void {
        this.loadingTable = true;
        this.colunas = <Coluna[]>[
            { header: "Nome", field: "nome" },
            { header: "Telefone", field: "telefone", style:{'width':'250px'} },
            { header: "Celular", field: "celular", style:{'width':'250px'} },
            { header: "CPF", field: "cpfFormatado", style:{'width':'200px'} },
            { bodyTemplateName: "editarProfessor", style:{'width':'50px'} },
            { bodyTemplateName: "excluirProfessor", style:{'width':'50px'} },
        ];

        this.professorService.listar().subscribe(data =>{
            this.list = [];
            this.loadingTable = false;
            data.forEach(d =>{
                this.list.push(Object.assign(new Professor(), d));
            });
        });
    }

    edita(id: number){
        this.carregaProfessor.emit(id);
    }
    
    showConfirmationDelete(item){
        this.professorDelete = item;
        this.displayDelete = true;
        this.updateView();
    }

    deleteProfessor(){
        this.displayDelete = false;
        this.professorService.deletar(this.professorDelete.id).subscribe()
    }
}
