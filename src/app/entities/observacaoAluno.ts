import { Aluno } from "./aluno";

export class ObservacaoAluno{
    id: number;
    obs: string;
    aluno: Aluno;
    data: Date;

    constructor(){
        this.id = null;
        this.obs = null;
        this.aluno = null;
        this.data = null;
    }
}