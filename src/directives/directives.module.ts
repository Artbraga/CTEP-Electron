import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { PrintTabDirective } from "./printTabsDirective.directive";

@NgModule({
    declarations: [PrintTabDirective],
    exports: [PrintTabDirective],
    imports: [
        MatTabsModule
    ]
})
export class DirectivesModule {}
