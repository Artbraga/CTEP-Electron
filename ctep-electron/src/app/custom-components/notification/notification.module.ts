import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { ToasterModule } from '@ons/material';

@NgModule({
    declarations: [NotificationComponent],
    imports: [
        CommonModule,
        ToasterModule
    ],
    providers: [
        NotificationService
    ],
    exports: [NotificationComponent]
})
export class NotificationModule {}
