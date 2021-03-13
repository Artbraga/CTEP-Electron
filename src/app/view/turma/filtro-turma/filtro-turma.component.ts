import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { Curso } from "src/model/curso.model";
import { FiltroTurma } from "src/model/filters/turma.filter";
import { CursoService } from "src/services/curso.service";

export const MY_FORMATS = {
    parse: {
        dateInput: "YYYY",
    },
    display: {
        dateInput: "YYYY",
        dateA11yLabel: "LL",
    },
};

@Component({
    selector: "filtro-turma",
    templateUrl: "./filtro-turma.component.html",
    styleUrls: ["./filtro-turma.component.scss"],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class FiltroTurmaComponent implements OnInit {
    @Output() pesquisar = new EventEmitter<FiltroTurma>();

    @Input() filtro: FiltroTurma;

    cursosOptions: Curso[];
    cursoSelecionado: Curso;

    constructor(private cursoService: CursoService) {}

    ngOnInit(): void {
        this.listarCursos();
    }

    listarCursos() {
        this.cursoService.listarCursos().subscribe((data) => {
            this.cursosOptions = data.map((x) => Object.assign(new Curso(), x));
            if (this.filtro.cursoId != null) {
                this.cursoSelecionado = this.cursosOptions.find(x => x.id = this.filtro.cursoId);
            }
        });
    }

    pesquisarTurmas() {
        if (this.cursoSelecionado != null) {
            this.filtro.cursoId = this.cursoSelecionado.id;
        }
        this.pesquisar.emit(this.filtro);
    }

    chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
        this.filtro.anoInicio = normalizedYear.toDate();
        datepicker.close();
    }

    limpar() {
        this.filtro = new FiltroTurma();
        this.cursoSelecionado = null;
    }
}
