import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { Toaster } from './toaster/toaster';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        NotificationComponent,
        Toaster
    ],
    imports: [
        CommonModule,
        MatButtonModule,
    ],
    providers: [
        NotificationService
    ],
    exports: [NotificationComponent]
})
export class NotificationModule {}
