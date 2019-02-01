import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ModalidadeEstagioService } from 'src/app/service/modalidadeEstagio.service';
import { BaseFormulario } from 'src/app/base/base-formulario';
import { ModalidadeEstagio } from 'src/app/entities/modalidadeEstagio';
import { Message } from 'primeng/primeng';
import { CursoService } from 'src/app/service/curso.service';

@Component({
    selector: 'formulario-modalidade-estagio',
    templateUrl: './modalidade-estagio.component.html',
})
export class ModalidadeEstagioComponent extends BaseFormulario<ModalidadeEstagio> implements OnInit {

    tentouAdicionar: boolean;
    @Output() showFeedback = new EventEmitter<Message>();
    @Output() fechar = new EventEmitter<any>();
    @Input() idElement: number;

    cursoSuggestions: any[];
    constructor(modalidadeService: ModalidadeEstagioService, private cursoService: CursoService, ref: ChangeDetectorRef) { 
        super(modalidadeService, ref);
    }

    ngOnInit() {
        this.element = new ModalidadeEstagio();
        if(this.idElement > 0){
            this.baseService.getById(this.idElement).subscribe(data => {
                this.element = Object.assign(new ModalidadeEstagio(), data);
            })
        }
    }

    isCampoInvalido(campo){
        switch (campo) {
            case 'modalidade':
                return this.tentouAdicionar && (this.element == null || !this.validField(this.element.modalidade));
            case 'curso':
                return this.tentouAdicionar && (this.element == null || !this.validField(this.element.curso));
        }
        return false;
    }

    cadastrarModalidade(){
        this.tentouAdicionar = true;
        if(!this.validField(this.element.modalidade) || !this.validField(this.element.curso)) return
        this.salvar(this.element, () =>{
            if(this.element.id > 0){
                this.showFeedback.emit({ severity: 'success', summary: 'Sucesso!', detail: 'Modalidade de Estágio editado com sucesso!' })
            }
            else{
                this.showFeedback.emit({ severity: 'success', summary: 'Sucesso!', detail: 'Modalidade de Estágio cadastrado com sucesso!' });
            }
            this.fechar.emit(null);
            this.tentouAdicionar = false;
        },
        (err) =>{

        })
    }

    buscarDropdown(busca, campo: string){
        let filter = busca.query;
        switch(campo){
            case "curso":
                this.cursoService.filtrar(filter).subscribe(data =>{
                    this.cursoSuggestions = data;
                });
                break;
        }
    }

    voltar(){  
        this.fechar.emit(null);
    }
}
