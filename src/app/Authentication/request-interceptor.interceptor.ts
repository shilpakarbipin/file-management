import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export const requestInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const attachTokenIntoRequestHeader = req.clone({
    headers: req.headers.set(
      'Authorization',
      'Bearer ' + localStorage['authToken']
    )
  })
  
  return next(attachTokenIntoRequestHeader);
};
