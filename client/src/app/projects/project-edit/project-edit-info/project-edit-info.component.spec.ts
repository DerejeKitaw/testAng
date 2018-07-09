import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditInfoComponent } from './project-edit-info.component';

describe('ProjectEditInfoComponent', () => {
  let component: ProjectEditInfoComponent;
  let fixture: ComponentFixture<ProjectEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
