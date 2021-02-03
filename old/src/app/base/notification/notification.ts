export enum NotificationType {
    Success = 1,
    Error = 2,
    Warnning = 3
}

export class Notification {
    constructor(
        public title: string,
        public text: string,
        public type: NotificationType
    ) { }
}
