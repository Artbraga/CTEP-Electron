import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Coluna } from 'src/app/components/table-x/table-x.component';
import { HospitalService } from 'src/app/service/hospital.service';
import { ModalidadeEstagioService } from 'src/app/service/modalidadeEstagio.service';
import { Hospital } from 'src/app/entities/hospital';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'tabela-utilidades',
    templateUrl: './tabela-utilidades.component.html',
})
export class TabelaUtilidadesComponent implements OnInit {

    @Output() edit = new EventEmitter<any>();
    @Output() showFeedback = new EventEmitter<Message>();
    @Input() tipo: string;
    list: any[];
    colunas: {[tipo: string] : Coluna[]} = {}
    loadingTabela: boolean = false;
    titulo: string;

    displayDeleteHospital: boolean = false;
    displayDeleteModalidade: boolean = false;

    deleteHospital: Hospital;
    deleteModalidade: Hospital;

    constructor(private hospitalService: HospitalService, private modalidadeService: ModalidadeEstagioService) { 
        this.colunas["tabela-hospital"] = <Coluna[]>[
            { header: "Nome", field: "nome" },
            { bodyTemplateName: "editar", style:{'width':'50px'} },
            { bodyTemplateName: "excluir", style:{'width':'50px'} },
        ];

        this.colunas["tabela-modalidade"] = <Coluna[]>[
            { header: "Modalidade", field: "modalidade" },
            { header: "Curso", field: "curso.nome" },
            { bodyTemplateName: "editar", style:{'width':'50px'} },
            { bodyTemplateName: "excluir", style:{'width':'50px'} },
        ];
    }

    ngOnInit() {
        this.loadingTabela = true;
        if(this.tipo == "tabela-hospital"){
            this.hospitalService.listar().subscribe(data => {
                this.list = data;
                this.loadingTabela = false;
            })
            this.titulo = "Hospitais";
        }
        if(this.tipo == "tabela-modalidade"){
            this.modalidadeService.listar().subscribe(data => {
                this.list = data;
                this.loadingTabela = false;
            })
            this.titulo = "Modalidades de Estágio";
        }
    }

    showConfirmationDelete(index: number){
        if(this.tipo == "tabela-hospital"){
            this.displayDeleteHospital = true;
            this.deleteHospital = this.list[index];
        }
        if(this.tipo == "tabela-modalidade"){
            this.displayDeleteModalidade = true;
            this.displayDeleteModalidade = this.list[index];
        }
    }

    edita(id: number){
        this.edit.emit({id: id, tipo: this.tipo})
    }

    delete(){
        if(this.tipo == "tabela-hospital"){
            this.hospitalService.deletar(this.deleteHospital.id).subscribe(data =>{
                if(data){
                    this.showFeedback.emit({ severity: 'success', summary: 'Sucesso!', detail: 'Hospital excluído com sucesso!' });
                    this.displayDeleteHospital = false;
                    this.ngOnInit();
                }
            })
        }
        if(this.tipo == "tabela-modalidade"){
            this.modalidadeService.deletar(this.deleteModalidade.id).subscribe(data =>{
                if(data){
                    this.showFeedback.emit({ severity: 'success', summary: 'Sucesso!', detail: 'Modalidade de Estágio excluída com sucesso!' });
                    this.displayDeleteModalidade = false;
                    this.ngOnInit();
                }
            })
        }
    }
}
