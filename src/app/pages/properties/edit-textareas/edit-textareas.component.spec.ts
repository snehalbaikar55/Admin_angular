import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTextareasComponent } from './edit-textareas.component';

describe('EditTextareasComponent', () => {
  let component: EditTextareasComponent;
  let fixture: ComponentFixture<EditTextareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTextareasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTextareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
