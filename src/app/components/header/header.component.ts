import { Component, inject } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { CommonService } from '../../services/common..service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatTabsModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  commonService = inject(CommonService)
  createNewFolder() {
    this.commonService.createNewFolder.emit({
      data: "create New Folder"
    })
  }

  uploadFilesOrFolder() {
    this.commonService.uploadFilesOrFolder.emit({
      data: "Upload Files Or = Folder"
    })
  }
}
