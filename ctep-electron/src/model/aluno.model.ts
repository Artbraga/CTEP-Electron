import { BaseConverter } from '../app/custom-components/base-converter';
import { Registro } from './registro.model';
import { TurmaAluno } from './turma-aluno.model';

export class Aluno {
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    orgaoEmissor: string;
    nomePai: string;
    nomeMae: string;
    sexo: string;

    endereco: string;
    bairro: string;
    cidade: string;
    cep: string;

    telefone: string;
    celular: string;
    email: string;

    cursoAnterior: string;

    registros: Registro[];
    turmasAluno: TurmaAluno[] = [];

    dataNascimento: Date;
    tipoStatusAluno: string;

    get dataNascimentoStr(): string {
        return BaseConverter.DateToStringOnlyDate(new Date(this.dataNascimento));
    }

    dataMatricula: Date;
    get dataMatriculaStr(): string {
        return BaseConverter.DateToStringOnlyDate(new Date(this.dataMatricula));
    }

    dataValidade: Date;
    get dataValidadeStr(): string {
        return BaseConverter.DateToStringOnlyDate(new Date(this.dataValidade));
    }

    get turmas(): string {
        return this.turmasAluno.map(x => x.turma.codigo).join(', ');
    }
}
