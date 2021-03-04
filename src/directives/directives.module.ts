import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { NgxElectronModule } from "ngx-electron";
import { PrintTabDirective } from "./printTabsDirective.directive";

@NgModule({
    declarations: [PrintTabDirective],
    exports: [PrintTabDirective],
    imports: [
        MatTabsModule,
        NgxElectronModule
    ]
})
export class DirectivesModule {}
