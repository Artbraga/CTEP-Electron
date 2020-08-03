import { BaseConverter } from '../app/custom-components/base-converter';
import { Registro } from './registro.model';

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

    dataNascimento: Date;
    registros: Registro[];
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
