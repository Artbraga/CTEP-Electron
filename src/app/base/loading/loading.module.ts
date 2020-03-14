import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';

@NgModule({
    declarations: [LoadingComponent],
    imports: [
        CommonModule,
    ],
    providers: [
        LoadingService
    ],
    exports: [LoadingComponent]
})
export class LoadingModule {}
