import { Component } from "@angular/core";
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { Notification, NotificationType } from './notification';

@Component({
    selector: "app-notification",
    templateUrl: "./notification.component.html",
    styleUrls: ["./notification.component.less"]
})
export class NotificationComponent {
    public NotificationType = NotificationType;

    notificationMessages$: Observable<Notification[]>;
    constructor(private notificationService: NotificationService) {
        this.notificationMessages$ = notificationService.notifications.asObservable();
    }

    closeToast(not: Notification) {
        this.notificationService.removeNotification(not);
    }
}


