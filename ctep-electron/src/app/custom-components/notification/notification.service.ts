import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationType, Notification } from './toaster/toaster';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notifications: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);


    public addNotification(title: string, text: string, type: NotificationType, tempo: number = 7) {
        let notificationList = this.notifications.value;
        const not = new Notification(title, text, type);
        notificationList = notificationList.concat(not);
        this.notifications.next(notificationList);
        setTimeout(() => {
            notificationList = this.notifications.value;
            this.notifications.next(notificationList);
            if (notificationList && notificationList.length > 0) {
                notificationList.filter(x => x !== not);
                this.notifications.next(notificationList);
            }
        }, tempo * 1000);
    }

    public removeNotification(not: Notification) {
        const notificationList = this.notifications.value.filter(n => n !== not);
        this.notifications.next(notificationList);
    }
}
