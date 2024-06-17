import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFolderComponent } from './shared-folder.component';

describe('SharedFolderComponent', () => {
  let component: SharedFolderComponent;
  let fixture: ComponentFixture<SharedFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
