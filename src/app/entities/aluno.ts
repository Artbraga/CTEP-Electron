import { Turma } from "./turma";
import { Curso } from "./curso";
import { ObservacaoAluno } from "./observacaoAluno";
import { BaseConverter } from "../base/base-converter";

export class Aluno {
    matricula: string;
    nome: string;
    rg: string;
    cpf: string;

    cep: string;
    endereco: string;
    complemento: string;
    bairro: string;
    cidade: string;
    email: string;
    telefone: string;
    celular: string;

    nomePai: string;
    nomeMae: string;

    notaFiscal: boolean;
    transferencia: boolean;

    _dataMatricula: Date;
    _dataNascimento: Date;
    _dataValidade: Date;
    cursoAnterior: string;
    anoMatricula: number;

    get dataMatricula(){
        return BaseConverter.convertDate(this._dataMatricula);
    }

    set dataMatricula(date){
        if(typeof(date) != typeof(new Date())){
            this._dataMatricula = BaseConverter.convertStringDateBRToDate(date);
        }
    }

    get dataNascimento(){
        return BaseConverter.convertDate(this._dataNascimento);
    }

    set dataNascimento(date){
        if(typeof(date) != typeof(new Date())){
            this._dataNascimento = BaseConverter.convertStringDateBRToDate(date);
        }
    }

    get dataValidade(){
        return BaseConverter.convertDate(this._dataValidade);
    }

    set dataValidade(date){
        if(typeof(date) != typeof(new Date())){
            this._dataValidade = BaseConverter.convertStringDateBRToDate(date);
        }
    }

    status: number;

    turma: Turma;
    turmaEspecializacao: Turma;

    curso: Curso;

    edicao: boolean;

    observacoes: ObservacaoAluno[];
    
    situacao: any;

    get cpfFormatado(){
        return this.cpf == null || this.cpf.length != 11 ? "" : this.cpf.substring(0,3) + "." + this.cpf.substring(3,6) + "." + this.cpf.substring(6,9) + "-" + this.cpf.substring(9,11)
    }

    constructor() {
        this.matricula = null;
        this.nome = null;
        this.rg = null;
        this.cpf = null;

        this.cep = null;
        this.endereco = null;
        this.complemento = null;
        this.bairro = null;
        this.cidade = null;
        this.email = null;
        this.telefone = null;
        this.celular = null;

        this.nomePai = null;
        this.nomeMae = null;

        this.notaFiscal = false;
        this.transferencia = false;

        this.dataMatricula = null;
        this.dataNascimento = null;
        this.dataValidade = null;
        this.cursoAnterior = null;
        this.anoMatricula = null;

        this.status = 1;

        this.turma = new Turma();
        this.turmaEspecializacao = null;

        this.curso = null;

        this.edicao = false;

        this.observacoes = [];

    }
}