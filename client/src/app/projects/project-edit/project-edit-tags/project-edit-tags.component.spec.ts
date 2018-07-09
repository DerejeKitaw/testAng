import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditTagsComponent } from './project-edit-tags.component';

describe('ProjectEditTagsComponent', () => {
  let component: ProjectEditTagsComponent;
  let fixture: ComponentFixture<ProjectEditTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
