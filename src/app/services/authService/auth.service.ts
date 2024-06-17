import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, delay, map, catchError, throwError} from 'rxjs';
import { ApiConfig } from '../../utils/api/api-config';
import { RefreshToken } from '../../utils/refresh-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  router = inject(Router);
  httpClient = inject(HttpClient);

  constructor() { }

  authenticate(
    username: string,
    password: string,
    showMessage?: boolean
  ): Observable<any> {
    const body = {
      'email': username,
        'password': password
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<any>(`${ApiConfig.login}`, body, {headers}).pipe(
      delay(1500),
      map((res: Response) => {
        if (showMessage) {
          // this.sharedService.getHttpSuccessResponseMessage(res);
        }
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        // this.sharedService.getServerErrorMessage(error.error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    this.isLoggedIn = false
    this.router.navigate(['/login']);
  }

  public refreshAccessToken(showMessage?: boolean): Observable<any> {
    let tokenDetails: RefreshToken = new RefreshToken();
    tokenDetails.accessToken = localStorage.getItem('access_token') || undefined;
    tokenDetails.refreshToken = localStorage.getItem('refresh_token') || undefined;
    tokenDetails.tokenType = 'Bearer';
    return this.httpClient.post<any>(`${ApiConfig.refreshToken}`, tokenDetails).pipe(
      map((res: Response) => {
        if (showMessage) {
          // this.sharedService.getHttpSuccessResponseMessage(res);
        }
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        // this.sharedService.getServerErrorMessage(error.error);
        return throwError(() => error);
      })
    );
  }

}
