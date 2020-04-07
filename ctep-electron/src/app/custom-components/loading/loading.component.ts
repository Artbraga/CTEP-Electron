import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
    selector: "app-loading",
    templateUrl: "./loading.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./loading.component.less"]
})
export class LoadingComponent {
    public loadingCount$: Observable<number>;
    constructor(private loadingService: LoadingService) {
        this.loadingCount$ = loadingService.loading.asObservable();
    }
}
