import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input } from '@angular/core';
import { BaseFormulario } from 'src/app/base/base-formulario';
import { Hospital } from 'src/app/entities/hospital';
import { HospitalService } from 'src/app/service/hospital.service';
import { Message } from "primeng/primeng";

@Component({
    selector: 'formulario-hospital',
    templateUrl: './hospital.component.html',
})
export class HospitalComponent extends BaseFormulario<Hospital> implements OnInit {

    tentouAdicionar: boolean;
    @Output() showFeedback = new EventEmitter<Message>();
    @Output() fechar = new EventEmitter<any>();
    @Input() idElement: number;

    constructor(hospitalService: HospitalService, ref: ChangeDetectorRef) { 
        super(hospitalService, ref);
    }

    ngOnInit() {
        this.element = new Hospital();
        if(this.idElement > 0){
            this.baseService.getById(this.idElement).subscribe(data => {
                this.element = Object.assign(new Hospital(), data);
            })
        }
    }

    isCampoInvalido(campo){
        switch (campo) {
            case 'nome':
                return this.tentouAdicionar && (this.element == null || !this.validField(this.element.nome));
        }
        return false;
    }

    cadastrarHospital(){
        this.tentouAdicionar = true;
        if(!this.validField(this.element.nome)) return
        this.salvar(this.element, () =>{
            if(this.element.id > 0){
                this.showFeedback.emit({ severity: 'success', summary: 'Sucesso!', detail: 'Hospital editado com sucesso!' })
            }
            else{
                this.showFeedback.emit({ severity: 'success', summary: 'Sucesso!', detail: 'Hospital cadastrado com sucesso!' });
            }
            this.tentouAdicionar = false;
            this.fechar.emit(null);
        },
        (err) =>{

        })
    }

    voltar(){  
        this.fechar.emit(null);
    }
}
