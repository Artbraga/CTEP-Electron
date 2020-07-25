import { BaseConverter } from '../app/custom-components/base-converter';

export class Aluno {
    id: number;
    nome: string;
    cpf: number;
    rg: number;
    nomePai: string;
    nomeMae: string;

    endereco: string;
    bairro: string;
    cidade: string;
    cep: string;

    telefone: string;
    celular: string;
    email: string;

    cursoAnterior: string;
    
    dataNascimento: Date;
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
}
