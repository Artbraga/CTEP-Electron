import { Turma } from "./turma";

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
    }
}