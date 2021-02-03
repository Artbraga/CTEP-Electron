import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root', })
export class RoutingService {
    private values: { [id: string]: any; } = {};

    possuiValor(key: string): boolean {
        return this.values[key] != null;
    }

    buscarValor(key: string): any {
        return this.values[key];
    }

    salvarValor(key: string, valor: any): void {
        this.values[key] = valor;
    }

    excluirValor(key: string): any {
        const valor = this.values[key];
        this.values[key] = null;
        return valor;
    }

    limparParametros() {
        this.values = {};
    }
}
