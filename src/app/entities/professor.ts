import { Turma } from "./turma";
import { BaseConverter } from "../base/base-converter";

export class Professor{
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    endereco: string;
    cep: string;
    complemento: string;
    cidade: string;
    bairro: string;

    email: string;
    telefone: string;
    celular: string;

    dataNascimento: Date;

    turmas: Turma[];

    edicao: boolean;

    get cpfFormatado(){
        return this.cpf == null ? "" : this.cpf.length == 14 ? this.cpf : this.cpf.length != 11 ? "" : this.cpf.substring(0,3) + "." + this.cpf.substring(3,6) + "." + this.cpf.substring(6,9) + "-" + this.cpf.substring(9,11)
    }

    get dataNascimentoStr(){
        return BaseConverter.convertDate(this.dataNascimento);
    }

    set dataNascimentoStr(date){
        if(typeof(date) != typeof(new Date())){
            this.dataNascimento = BaseConverter.convertStringDateBRToDate(date);
        }
    }

    constructor(){
        this.id = null;
        this.nome = null;
        this.cpf = null;
        this.rg = null;
        this.endereco = null;
        this.cep = null;
        this.complemento = null;
        this.cidade = null;
        this.bairro = null;
        this.email = null;
        this.telefone = null;
        this.celular = null;
        this.dataNascimento = null;
        this.turmas = [];
        this.edicao = false;
    }
}