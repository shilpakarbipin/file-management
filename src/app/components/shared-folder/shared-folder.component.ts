import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared-service';
import { CommonService } from '../../services/common..service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreateNewFolderComponent } from '../../dialogs/create-new-folder/create-new-folder.component';
import { Subject, takeUntil } from 'rxjs';
import { UploadFilesFolderComponent } from '../../dialogs/upload-files-folder/upload-files-folder.component';

// export interface PeriodicElement {
//   name: string;
//   id: number;
//   path: string;
//   hasChild: boolean;
//   pId: number;
// }

@Component({
  selector: 'app-shared-folder',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatCardModule
  ],
  templateUrl: './shared-folder.component.html',
  styleUrl: './shared-folder.component.scss'
})
export class SharedFolderComponent implements OnInit, OnDestroy{
  sharedService = inject(SharedService);
  commonService = inject(CommonService);
  ngbModal = inject(NgbModal);
  sharedItemsList: Array<any>= new Array<any>();
  @Input() currentPath: string = 'shared-folder';
  private destroy:Subject<any> = new Subject<any>();

  constructor() { 
    debugger
    this.commonService.createNewFolder.pipe(
      takeUntil(this.destroy))
      .subscribe((data: any) => {
        debugger
        const option: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false,
          centered: true,
          animation: true,
          size: 'sm'
        };
        const obj =	this.ngbModal.open(CreateNewFolderComponent, option);
        obj.result.then( rs => {
          if (rs === 'success') {
            
          }
        })
      })

    this.commonService.confirmCreateNewFolder.subscribe((data: any) => {
      this.createFolder(data);
    })

    this.commonService.uploadFilesOrFolder.pipe(
      takeUntil(this.destroy))
      .subscribe((data: any) => {
        debugger
        const option: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false,
          centered: true,
          animation: true,
          size: 'md'
        };
        const obj =	this.ngbModal.open(UploadFilesFolderComponent, option);
        obj.result.then( rs => {
          if (rs === 'success') {
            this.getSharedFiles();
          }
        })
      })
  }
  ngOnInit(): void {
    this.getSharedFiles();
    this.commonService.currentPath.emit(this.currentPath);
  }

  getSharedFiles() {
    let params ={ 
      "path" : "shared/folder5/folder5",
      "isRefresh" : false
    }
    this.sharedService.getSharedFolders(params).subscribe( sharedList => {
      this.sharedItemsList = sharedList.data;
    });
  }

  createFolder(data: any) {
    let params = {
      "path" : "shared/folder5/folder5",
      "name" : data.data
  }
    this.sharedService.createFolder(params).subscribe( sharedList => {
      this.getSharedFiles();
      this.ngbModal.dismissAll()
    });
  }

  doubleClick() {
  }

  ngOnDestroy() {
    this.destroy.next(0);
  }
}
