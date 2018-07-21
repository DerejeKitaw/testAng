import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditEquipmentsComponent } from './project-edit-equipments.component';

describe('ProjectEditEquipmentsComponent', () => {
  let component: ProjectEditEquipmentsComponent;
  let fixture: ComponentFixture<ProjectEditEquipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditEquipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
