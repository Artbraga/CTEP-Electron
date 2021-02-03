import { Directive, HostListener, Input } from "@angular/core";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { reduce } from "rxjs/operators";
@Directive({
    selector: "mat-tab-group[ngxPrint]",
})
export class PrintTabDirective {

    @Input() printSectionId: string;

    useExistingCss = true;
    printDelay: number = 0;

    constructor(private tabs: MatTabGroup) {

    }

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
            var buttons = old.getElementsByTagName('button');
            if (buttons) {
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].remove();
                }
            }
            return Promise.resolve(old);
        }, Promise.resolve(document.createElement("div")));

        return ret.innerHTML;
    }

    private async buscarElementosdaTab(tab: MatTab, tabGroup: MatTabGroup, index: number): Promise<string> {
        return new Promise(resolve => {
            tabGroup.selectedIndex = index;
            setTimeout(() => {
                let printContents = Array.from(document.getElementsByClassName('mat-tab-body-active'))
                const reducedDivs = printContents.reduce((acc, div) => {
                    acc.innerHTML += div.innerHTML;
                    return acc;
                }, );
                resolve(reducedDivs.innerHTML);
            }, 100);
        });
    }

    public async print() {
        let printContents,
            popupWin,
            styles = "",
            links = "";

        if (this.useExistingCss) {
            styles = this.getElementTag("style");
            links = this.getElementTag("link");
        }

        printContents = await this.getHtmlContents();
        popupWin = window.open(
            "",
            "_blank",
            "top=0,left=0,height=auto,width=auto"
        );
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          ${styles}
          ${links}
        </head>
        <body>
        <div class="print-container">
        <h1>Ficha do Aluno</h1>
          ${printContents}
        </div>
          <script defer>
            function triggerPrint(event) {
              window.removeEventListener('load', triggerPrint, false);
              setTimeout(function() {
                window.print();
                setTimeout(function() { window.close(); }, 0);
              }, ${this.printDelay});
            }
            window.addEventListener('load', triggerPrint, false);
          </script>
        </body>
      </html>`);
        popupWin.document.close();
    }
}
