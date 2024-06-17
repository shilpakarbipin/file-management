import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, UntypedFormGroup, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common..service';

@Component({
  selector: 'app-create-new-folder',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-new-folder.component.html',
  styleUrl: './create-new-folder.component.scss'
})
export class CreateNewFolderComponent implements OnInit {
  createNewFolderForm: UntypedFormGroup = new UntypedFormGroup({});
  formBuilder = inject(FormBuilder);
  ngbModal = inject(NgbActiveModal);
  commonService = inject(CommonService);
  ngOnInit(): void {
    this.initCreateNewFolderForm()
  }

  initCreateNewFolderForm() {
    this.createNewFolderForm = this.formBuilder.group({
      folderName: ['New Folder', Validators.compose([Validators.required])]
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.createNewFolderForm.controls;
  }

  createFolder() {
    this.commonService.confirmCreateNewFolder.emit({      
      data: this.createNewFolderForm.value.folderName
    })
  }

  onClose() {
    this.ngbModal.close('close');
  }
}
