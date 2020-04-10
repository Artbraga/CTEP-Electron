import {
    Component,
    Input,
    Output,
    EventEmitter,
    TemplateRef,
} from "@angular/core";

@Component({
    selector: "toaster",
    templateUrl: "./toaster.html",
    styleUrls: ["./toaster.scss"],
})
export class Toaster {
    @Input() notificationMessages: Notification[] = [];

    @Output() notificationMessagesChange = new EventEmitter();
    @Input() versionTemplate: TemplateRef<any>;

    constructor() {}

    closeToast(not: Notification) {
        console.log(this.notificationMessages);
        this.notificationMessages = this.notificationMessages.filter(
            (x) => x != not
        );
        this.notificationMessagesChange.emit(this.notificationMessages);
        console.log(this.notificationMessages);
    }

    getClass(type: NotificationType) {
        switch (type) {
            case NotificationType.Error:
                return "error";
            case NotificationType.Warnning:
                return "alert";
            case NotificationType.Success:
                return "positive";
            case NotificationType.Notification:
                return "notification";
        }
    }
}

export enum NotificationType {
    Success = 1,
    Error = 2,
    Warnning = 3,
    Notification = 4,
}
export class Notification {
    constructor(
        public title: string,
        public text: string,
        public type: NotificationType
    ) {}
}
