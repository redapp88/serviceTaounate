import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersPage } from './workers.page';

describe('WorkersPage', () => {
  let component: WorkersPage;
  let fixture: ComponentFixture<WorkersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
