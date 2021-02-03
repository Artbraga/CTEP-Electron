import { Curso } from "./curso";

export class ModalidadeEstagio{
    id: number;
    modalidade: string;
    curso: Curso;

    constructor(){
        this.id = 0;
        this.modalidade = null;
        this.curso = null;
    }
}