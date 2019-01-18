import { Aluno } from "./aluno";
import { BaseConverter } from "../base/base-converter";

export class ObservacaoAluno{
    id: number;
    obs: string;
    aluno: Aluno;
    data: any;

    get dataStr(): string{
        return BaseConverter.convertDate(this.data);
    }

    constructor(){
        this.id = null;
        this.obs = null;
        this.aluno = null;
        this.data = null;
    }
}