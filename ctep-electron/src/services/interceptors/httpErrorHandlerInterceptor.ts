import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../app/custom-components/notification/notification.service';
import { NotificationType } from '../../app/custom-components/notification/toaster/toaster';
import { LoadingService } from '../../app/custom-components/loading/loading.service';
@Injectable()
export class HttpErrorHandleInterceptor implements HttpInterceptor {

    constructor(private notification: NotificationService, private loadingService: LoadingService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(request)
            .pipe(catchError(err => {
                if (err.error) {
                    this.mostraErro('Erro!', err.error);
                } else if (!err.error && !err.error.payload && !err.error.payload.Errors) {
                    this.mostraErro(err.name, err.mensagem);
                } else if (err.status === 401) {
                    this.mostraErro('Não Autorizado', err.error);
                }
                this.loadingService.removeLoading();
                throw err;
            }));
    }

    private mostraErro(titulo: string, mensagem: string) {
        this.notification.addNotification(titulo, mensagem, NotificationType.Error);
    }
}
