import { Turma } from "./turma";

export class ObservacaoTurma{
    id: number;
    obs: string;
    turma: Turma;
    data: Date;

    constructor(){
        this.id = null;
        this.obs = null;
        this.turma = null;
        this.data = null;
    }
}