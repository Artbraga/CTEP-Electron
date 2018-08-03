export abstract class BaseEntity {
    public Id: any;
    public idedicao: number; // Para controle de edição de uma entidade no frontend.

    public fillData(data) {
        this.Id = data.Id;
    }

    public CriaDTO(): any {
        return this;
    }

    public constructor(element = null) {
        if (element) {
            for (let prop in element) {
                this[prop] = element[prop]
            }
        }
    }

}
