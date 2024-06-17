import { EventEmitter, Injectable, Output, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommonService {
    @Output() public createNewFolder: EventEmitter<any> = new EventEmitter();
    @Output() public uploadFilesOrFolder: EventEmitter<any> = new EventEmitter();
    @Output() public confirmCreateNewFolder: EventEmitter<any> = new EventEmitter();
    @Output() public currentPath: EventEmitter<any> = new EventEmitter();
}