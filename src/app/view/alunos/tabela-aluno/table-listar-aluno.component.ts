import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { Aluno } from "src/app/entities/aluno";
import { Message } from "primeng/primeng";
import { BaseTable } from "src/app/base/baseTable";
import { AlunoService } from "../../../service/aluno/aluno.service";

@Component({
    selector: 'table-listar-aluno',
    templateUrl: './table-listar-aluno.component.html',
})
export class TableListarAlunoComponent extends BaseTable implements OnInit {
    
    @Input() loading;

    constructor(alunoService: AlunoService, ref: ChangeDetectorRef){
        super(alunoService, ref);
    }
    ngOnInit(): void {
        
    }
}