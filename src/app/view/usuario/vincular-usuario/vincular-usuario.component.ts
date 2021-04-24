import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FiltroAluno } from '../../../../model/filters/aluno.filter';
import { Pessoa } from '../../../../model/pessoa.model';
import { AlunoService } from '../../../../services/aluno.service';
import { NotificationService } from '../../../custom-components/notification/notification.service';
import { NotificationType } from '../../../custom-components/notification/toaster/toaster';

@Component({
    selector: 'app-vincular-usuario',
    templateUrl: './vincular-usuario.component.html',
    styleUrls: ['./vincular-usuario.component.scss']
})
export class VincularUsuarioComponent implements OnInit {

    tipoVinculo: string;
    pessoasOptions: Pessoa[];
    pessoaSelecionada: Pessoa;

    constructor(private alunoService: AlunoService,
                private notificationService: NotificationService,
                private dialogRef: MatDialogRef<VincularUsuarioComponent>,
        ) { }

    ngOnInit(): void {
    }

    pesquisar(value: string) {
        switch (this.tipoVinculo) {
            case 'aluno': {
                const filtro = new FiltroAluno();
                filtro.nome = value;
                this.alunoService.pesquisarAlunos(filtro).subscribe(data => {
                    this.pessoasOptions = data.lista.map(x => {
                        const p = new Pessoa();
                        p.id = x.id;
                        p.nome = x.nome;
                        p.telefone = x.celular;
                        p.email = x.email;
                        p.tipo = this.tipoVinculo;
                        return p;
                    });
                });
                break;
            }
            case 'professor': {
                break;
            }
        }
    }

    closeModal(salvar: boolean) {
        if (salvar) {
            if (this.pessoaSelecionada != null) {
                this.dialogRef.close(this.pessoaSelecionada);
            } else {
                this.notificationService.addNotification('Atenção', `Nenhum ${this.tipoVinculo} selecionado.`, NotificationType.Warnning);
            }
        } else {
            this.dialogRef.close();
        }
    }
}
