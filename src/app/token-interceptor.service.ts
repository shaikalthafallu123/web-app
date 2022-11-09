import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor {
  router: any;

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   let token=JSON.parse(localStorage.getItem('token')|| '{}');
   if (token) {
    req = req.clone({
      setHeaders: { Authorization: `${token.token}` }
    });
  }
  return next.handle(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        console.log(err.url);
        // if the status shows then redirect to home page
        if (err.status === 401 || err.status === 403) {
          if (this.router.url === '/') { }
          else {
            localStorage.clear();
            this.router.navigate(['/']);
          }
        }
      }
      return throwError(err)


    })
  );

}
}