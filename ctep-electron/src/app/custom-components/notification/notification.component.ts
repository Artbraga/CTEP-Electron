import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { Notification, NotificationType } from '@ons/material';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less']
})
export class NotificationComponent {
    public NotificationType = NotificationType;

    notificationMessages$: Observable<Notification[]>;
    constructor(private notificationService: NotificationService) {
        this.notificationMessages$ = notificationService.notifications.asObservable();
    }

    closeToast(notifications: Notification[]) {
        this.notificationService.notifications.next(notifications);
    }
}


