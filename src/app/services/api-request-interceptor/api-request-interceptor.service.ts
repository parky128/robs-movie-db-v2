import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})

export class APIRequestInterceptorService implements HttpInterceptor {
  constructor(
    private spinnerService: SpinnerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
    this.spinnerService.showSpinner.next(true);
    return next.handle(req).pipe(finalize(() => {
      this.spinnerService.showSpinner.next(false);
    }));
  }
}
