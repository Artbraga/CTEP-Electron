import { Component, OnInit } from "@angular/core";
import { AlunoService } from 'src/services/aluno.service';
import { RoutingService } from 'src/services/routing.service';
import { Router } from '@angular/router';
import { Turma } from 'src/model/turma.model';
import { Aluno } from 'src/model/aluno.model';

@Component({
    selector: "ficha-aluno",
    templateUrl: "./ficha-aluno.component.html",
    styleUrls: ["./ficha-aluno.component.scss"],
})
export class FichaAlunoComponent implements OnInit {
    rotaVoltar: string;
    element: Aluno;
    imagem: any;

    constructor(
        private alunoService: AlunoService,
        private routingService: RoutingService,
        private router: Router) {
        this.element = new Aluno();
    }

    ngOnInit(): void {
        if (this.routingService.possuiValor("idAluno")) {
            const id = this.routingService.excluirValor("idAluno") as number;
            this.rotaVoltar = this.routingService.excluirValor("rotaVoltar");
            this.alunoService.getById(id).subscribe((data) => {
                this.element = Object.assign(new Aluno(), data);
                console.log(this.element);
            });
        }
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: this.rotaVoltar } }]);
    }

    tratarString(str: string): string {
        if (str != null && str.length > 0) {
            return str;
        }
        return '---';
    }
}
