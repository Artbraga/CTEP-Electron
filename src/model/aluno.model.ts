import { BaseConverter } from '../app/custom-components/base-converter';
import { TipoStatusAlunoEnum } from './enums/tipo-status-aluno.enum';
import { RegistroAluno } from './registro-aluno.model';
import { TurmaAluno } from './turma-aluno.model';
import { Turma } from './turma.model';

export class Aluno {
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    orgaoEmissor: string;
    nomePai: string;
    nomeMae: string;
    sexo: string;
    naturalidade: string;

    endereco: string;
    bairro: string;
    complemento: string;
    cidade: string;
    cep: string;

    telefone: string;
    celular: string;
    email: string;

    cursoAnterior: string;

    registros: RegistroAluno[];
    turmasAluno: TurmaAluno[] = [];

    dataNascimento: Date;
    tipoStatusAluno: string;

    get dataNascimentoStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.dataNascimento);
    }

    dataMatricula: Date;
    get dataMatriculaStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.dataMatricula);
    }

    dataValidade: Date;
    get dataValidadeStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.dataValidade);
    }

    get turmas(): string {
        return this.turmasAluno.map(x => x.turma.codigo).join(', ');
    }

    get matriculas(): string {
        return this.turmasAluno.map(x => x.matricula).join(', ');
    }

    get nomeMatricula(): string {
        let turmaAtiva = this.turmasAluno.filter(x => x.tipoStatusAluno == TipoStatusAlunoEnum.Ativo.name);
        if (turmaAtiva.length > 0) {
            let matricula = turmaAtiva[0].matricula;
            return `${matricula} - ${this.nome}`;
        }
        return `${this.nome}`;
    }

    corrigirInformacoes() {
        if (this.dataMatricula != null) {
            this.dataMatricula = BaseConverter.StringToDate(this.dataMatricula.toString());
        }
        if (this.dataNascimento != null) {
            this.dataNascimento = BaseConverter.StringToDate(this.dataNascimento.toString());
        }
        if (this.dataValidade != null) {
            this.dataValidade = BaseConverter.StringToDate(this.dataValidade.toString());
        }
        if (this.turmasAluno != null) {
            this.turmasAluno = this.turmasAluno.map(ta => {
                const turmaAluno = Object.assign(new TurmaAluno(), ta);
                turmaAluno.turma = Object.assign(new Turma(), ta.turma);
                if (turmaAluno.dataConclusao != null) {
                    turmaAluno.dataConclusao = BaseConverter.StringToDate(turmaAluno.dataConclusao.toString());
                }
                return turmaAluno;
            });
        }
        if (this.registros != null) {
            this.registros = this.registros.map(reg => {
                reg = Object.assign(new RegistroAluno(), reg);
                reg.data = BaseConverter.StringToDate(reg.data.toString());
                return reg;
            });
        }
    }
}
