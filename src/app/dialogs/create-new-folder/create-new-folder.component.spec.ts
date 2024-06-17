import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewFolderComponent } from './create-new-folder.component';

describe('CreateNewFolderComponent', () => {
  let component: CreateNewFolderComponent;
  let fixture: ComponentFixture<CreateNewFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewFolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
