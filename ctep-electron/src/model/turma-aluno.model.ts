import { Turma } from './turma.model';

export class TurmaAluno {
    public id: number;
    public matricula: string;
    public dataConclusao: string;
    public codigoConlusaoSistec: string;
    public turma: Turma;
}
