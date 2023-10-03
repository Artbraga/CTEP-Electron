import { Injectable } from "@angular/core";
import { BoletosConstant } from "src/model/enums/constants";

@Injectable({ providedIn: "root" })
export class MemoryListService {
    private values: { [id: string]: any[] } = {};

    constructor() {
        this.values[BoletosConstant] = [];
    }

    limpar(id: string) {
        this.values[id] = [];
    }

    adicionar(obj: any, id: string) {
        this.values[id].push(obj);
    }

    remover(obj: any, id: string) {
        this.values[id] = this.values[id].filter((x) => x != obj);
    }

    buscarLista(id: string): any[] {
        return this.values[id];
    }
}
