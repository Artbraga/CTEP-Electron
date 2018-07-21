import { Turma } from "./turma";
import { Curso } from "./curso";
import { ObservacaoAluno } from "./observacaoAluno";

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

    dataMatricula: Date;
    dataNascimento: Date;
    dataValidade: Date;
    cursoAnterior: string;
    anoMatricula: number;

    status: number;

    turma: Turma;
    turmaEspecializacao: Turma;

    curso: Curso;

    observacoes: ObservacaoAluno[];

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

        this.dataMatricula = null;
        this.dataNascimento = null;
        this.dataValidade = null;
        this.cursoAnterior = null;
        this.anoMatricula = null;

        this.status = 1;

        this.turma = new Turma();
        this.turmaEspecializacao = new Turma();

        this.curso = new Curso();

        this.observacoes = [];
    }
}