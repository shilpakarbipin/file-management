import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, UntypedFormGroup, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common..service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SharedService } from '../../services/shared-service';


@Component({
  selector: 'app-upload-files-folder',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule],
  templateUrl: './upload-files-folder.component.html',
  styleUrl: './upload-files-folder.component.scss'
})
export class UploadFilesFolderComponent implements OnInit {
  createNewFolderForm: UntypedFormGroup = new UntypedFormGroup({});
  formBuilder = inject(FormBuilder);
  ngbModal = inject(NgbActiveModal);
  commonService = inject(CommonService);
  selectedFiles: File[] = [];
  selectedItems: any[] = [];
  sharedService = inject(SharedService);
  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  toggleItemSelection(item: any) {
    if (this.isCtrlKeyPressed(event as KeyboardEvent)) {
      this.addOrRemoveSelectedItem(item);
    } else {
      this.selectedItems = [item];
    }
  }

  isCtrlKeyPressed(event: Event): boolean {
    return (event as KeyboardEvent).ctrlKey || (event as KeyboardEvent).metaKey; // Cast to KeyboardEvent for clarity
  }

  isSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  addOrRemoveSelectedItem(item: any) {
    const itemIndex = this.selectedItems.findIndex(selectedItem => selectedItem === item);
  
    if (itemIndex > -1) {
      this.selectedItems.splice(itemIndex, 1);
    } else {
      this.selectedItems.push(item);
    }
  }

  @ViewChild('cardList') cardListRef!: ElementRef<HTMLDivElement>;


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.cardListRef?.nativeElement?.contains(event.target as Node);
    if (clickedInside == undefined) { 
      return;
    } else if (!clickedInside) {
      this.selectedItems = [];
    }
  }
  ngOnInit(): void {
    
  }

  uploadFilesOrFolder() {
    this.sharedService.savefiles(this.selectedItems).subscribe((result: any) => {
      console.log(result);
      this.ngbModal.close('success');
    });
  }

  onClose() {
    this.ngbModal.close('close');
  }
}
