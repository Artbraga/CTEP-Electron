import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationType, Notification } from './toaster/toaster';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notifications: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);


    public addNotification(title: string, text: string, type: NotificationType) {
        let notificationList = this.notifications.value;
        notificationList =  notificationList.concat(new Notification(title, text, type));
        this.notifications.next(notificationList);
    }

    public removeNotification(not: Notification) {
        const notificationList = this.notifications.value.filter(n => n !== not);
        this.notifications.next(notificationList);
    }
}
