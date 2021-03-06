import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({ providedIn: 'root' })
export class BaixarArquivoService {

    downloadFile(data: any, nomeArquivo: string, tipoArquivo: string = '') {
        const blob = new Blob([this.stringToArrayBuffer(atob(data))], { type: tipoArquivo });
        FileSaver.saveAs(blob, nomeArquivo);
    }

    private stringToArrayBuffer(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) {
            // tslint:disable-next-line: no-bitwise
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }
}
