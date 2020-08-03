import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/model/aluno.model';
import { MaskPatterns } from 'src/model/enums/mask.enum';
import { ViacepService } from 'src/services/ngx-viacep/viacep.service';
import { Endereco } from 'src/services/ngx-viacep/endereco';
import { LoadingService } from 'src/app/custom-components/loading/loading.service';
import { NotificationService } from 'src/app/custom-components/notification/notification.service';
import { NotificationType } from 'src/app/custom-components/notification/toaster/toaster';
import { Router } from '@angular/router';
import { BaseFormularioComponent } from '../../../base/base-formulario.component';
import { AlunoService } from '../../../../services/aluno.service';
import { Curso } from '../../../../model/curso.model';
import { CursoService } from '../../../../services/curso.service';
import { TurmaService } from '../../../../services/turma.service';
import { Turma } from '../../../../model/turma.model';

@Component({
    selector: 'app-formulario-aluno',
    templateUrl: './formulario-aluno.component.html',
    styleUrls: ['./formulario-aluno.component.scss'],
})
export class FormularioAlunoComponent extends BaseFormularioComponent<Aluno> implements OnInit {

    masks = MaskPatterns;
    imagem: any;

    cursosOptions: Curso[] = [];
    cursoSelecionado: Curso;

    turmasOptions: Turma[] = [];
    turmaSelecionada: Turma;
    matricula: string;
    constructor(private alunoService: AlunoService,
                private cusroService: CursoService,
                private turmaService: TurmaService,
                private cepService: ViacepService,
                private loadingService: LoadingService,
                private notificationService: NotificationService,
                private router: Router) {
        super(alunoService, new Aluno());
    }

    ngOnInit() {
        this.listarCursos();

        this.element.dataMatricula = new Date();
    }

    validar(): boolean {
        let valido = true;
        if (!this.stringValida(this.element.nome)) {
            valido = false;
            this.notificationService.addNotification('Informação faltante!', 'O campo Nome é obrigatório para cadastrar um alino.', NotificationType.Error);
        }
        if (!this.stringValida(this.element.cpf)) {
            valido = false;
            this.notificationService.addNotification('Informação faltante!', 'O campo Nome é obrigatório para cadastrar um alino.', NotificationType.Error);
        }

        return valido;
    }

    inserirFoto(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.imagem = event.target.result;
        });
        reader.readAsDataURL(file);
      }

    listarCursos() {
        this.cusroService.listarCursos().subscribe(data => {
            this.cursosOptions = data.map(x => Object.assign(new Curso(), x));
        });
    }

    buscarTurmas() {
        this.turmaSelecionada = null;
        this.turmaService.buscarTurmasDeUmCurso(this.cursoSelecionado.id).subscribe(data => {
            this.turmasOptions = data.map(x => Object.assign(new Turma(), x));
        });
    }

    buscarCep() {
        this.loadingService.addLoading();
        this.cepService.buscarPorCep(this. element.cep).then((x) => {
            this.loadingService.removeLoading();
            if (!x.hasOwnProperty('erro')) {
                this.notificationService.addNotification('Sucesso!', 'CEP encontrado com sucesso!', NotificationType.Notification);
                const endereco = x as Endereco;
                this.element.bairro = endereco.bairro;
                this.element.cidade = endereco.localidade;
                this.element.endereco = endereco.logradouro;
            } else {
                this.element.bairro = null;
                this.element.cidade = null;
                this.element.endereco = null;
                this.notificationService.addNotification('Erro!', 'Endereço não encontrado para o CEP digitado.', NotificationType.Error);
            }
        });
    }

    gerarMatricula() {
        const dataMatricula = new Date(this.element.dataMatricula);
        this.loadingService.addLoading();
        this.alunoService.gerarNumeroDeMatricula(this.cursoSelecionado.id, dataMatricula.getFullYear()).subscribe(data => {
            this.matricula = data;
            this.loadingService.removeLoading();
        })
    }

    voltar() {
        this.router.navigate([{ outlets: { secondRouter: null } }]);
    }

    salvar() {
        console.log(this.element);
    }
}
