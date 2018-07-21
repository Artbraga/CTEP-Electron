import { Turma } from "./turma";

export class Professor{
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    endereco: string;

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
        this.email = null;
        this.telefone = null;
        this.celular = null;
        this.dataNascimento = null;
        this.turmas = [];
    }
}