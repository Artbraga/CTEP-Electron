import { Curso } from "./curso";

export class Disciplina{
    id: number;
    nome: string;
    curso: Curso;

    constructor(){
        this.id = null;
        this.nome = null;
        this.curso = null;
    }
}