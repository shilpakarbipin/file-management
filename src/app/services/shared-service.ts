import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUtils } from '../utils/api/api-utils';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SharedService{
    http = inject(HttpClient);
    static API = 'assets';

    protected getApi(): string {
        return SharedService.API;
      }
    getSharedFolders(shared: any): Observable<any>{
        const req = ApiUtils.getRequest(`${this.getApi()}/list`);
        return this.http.post(req.url, shared, {headers: req.header});
    }

    createFolder(shared: any): Observable<any>{
        const req = ApiUtils.getRequest(`${this.getApi()}/folder`);
        return this.http.post(req.url, shared, {headers: req.header});
    }

    savefiles(file: any): Observable<any>{
        const req = ApiUtils.getRequestWithFileSupport(`${this.getApi()}/files`);
        return this.http.post(req.url, file, {headers: req.header});
    }
}