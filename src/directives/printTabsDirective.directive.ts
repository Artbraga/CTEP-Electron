import { Directive, Input } from "@angular/core";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { ElectronService } from "ngx-electron";

@Directive({
    selector: "mat-tab-group[ngxPrint]",
})
export class PrintTabDirective {
    @Input() printSectionId: string;

    useExistingCss = true;
    printDelay: number = 0;

    constructor(private tabs: MatTabGroup, private _electronService : ElectronService) {}

    private getElementTag(tag: keyof HTMLElementTagNameMap): string {
        const html: string[] = [];
        const elements = document.getElementsByTagName(tag);
        for (let index = 0; index < elements.length; index++) {
            html.push(elements[index].outerHTML);
        }
        return html.join("\r\n");
    }

    private async getHtmlContents() {
        // const printDiv = document.createElement("div");
        var ret = await this.tabs._allTabs.reduce(async (acc, tab, i) => {
            var old = await acc;
            old.innerHTML += await this.buscarElementosdaTab(tab, this.tabs, i);
            var buttons = old.getElementsByTagName("button");
            if (buttons) {
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].remove();
                }
            }
            return Promise.resolve(old);
        }, Promise.resolve(document.createElement("div")));

        return ret.innerHTML;
    }

    private async buscarElementosdaTab(
        tab: MatTab,
        tabGroup: MatTabGroup,
        index: number
    ): Promise<string> {
        return new Promise((resolve) => {
            tabGroup.selectedIndex = index;
            setTimeout(() => {
                let printContents = Array.from(
                    document.getElementsByClassName("mat-tab-body-active")
                );
                const reducedDivs = printContents.reduce((acc, div) => {
                    acc.innerHTML += div.innerHTML;
                    return acc;
                });
                resolve(reducedDivs.innerHTML);
            }, 100);
        });
    }

    public async print() {
        let printContents = await this.getHtmlContents();
        let styles = this.getElementTag("style");
        let links = this.getElementTag("link");
            const html = `
            <!doctype html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    ${styles}
                    ${links}
                    <script type="text/javascript">
                        window.onload = function() { window.print(); }
                        window.onfocus = function(){ window.close(); }
                    </script>
                </head>
                <body>
                    <div id="print-container">
                        <h1>Ficha do Aluno</h1>
                        ${printContents}
                    </div>
                </body>`;
        this._electronService.ipcRenderer.on('print', (event, resp) => {
            console.log(resp);
        });
        this._electronService.ipcRenderer.send('print', html);
    }
}
