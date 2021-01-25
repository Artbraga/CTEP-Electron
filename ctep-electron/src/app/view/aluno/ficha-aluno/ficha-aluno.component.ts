import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/services/aluno.service';
import { RoutingService } from 'src/services/routing.service';
import { Router } from '@angular/router';
import { Aluno } from 'src/model/aluno.model';
import { IdAlunoParameter, RotaVoltarParameter } from '../../../../model/enums/constants';
import { BaseConverter } from '../../../custom-components/base-converter';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from '../../../custom-components/modal-confirmacao/modal-confirmacao.component';
import { TurmaAlunoComponent } from '../turma-aluno/turma-aluno.component';

@Component({
    selector: 'ficha-aluno',
    templateUrl: './ficha-aluno.component.html',
    styleUrls: ['./ficha-aluno.component.scss'],
})
export class FichaAlunoComponent implements OnInit {
    rotaVoltar: string;
    element: Aluno;
    imagem: any;

    constructor(
        private alunoService: AlunoService,
        private routingService: RoutingService,
        private router: Router,
        public dialog: MatDialog) {
        this.element = new Aluno();
    }

    ngOnInit(): void {
        if (this.routingService.possuiValor(IdAlunoParameter)) {
            const id = this.routingService.excluirValor(IdAlunoParameter) as number;
            this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
            this.alunoService.getById(id).subscribe((data) => {
                this.element = Object.assign(new Aluno(), data);
                this.element.corrigirDatas();
            });
            this.alunoService.buscarImagem(id).subscribe(data => {
                if (data != null && data.size > 0) {
                    const blob = new Blob([data], { type: 'image/png' });
                    const reader = new FileReader();

                    reader.addEventListener('load', (event: any) => {
                        this.imagem = event.target.result;
                    });
                    reader.readAsDataURL(blob);
                }
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

    getCampo(campo: string, aluno: Aluno): string {
        if (aluno != null) {
            switch (campo) {
                case 'sexo':
                    return aluno.sexo === 'm' ? 'Masculino' : 'Feminino';
            }
        }
        return '---';
    }

    vincularTurma() {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja vincular o aluno ${this.element.nome} em uma turma?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialog.open(TurmaAlunoComponent, { data: this.element });
            }
        });
    }
}
