import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsubregionComponent } from './editsubregion.component';

describe('EditsubregionComponent', () => {
  let component: EditsubregionComponent;
  let fixture: ComponentFixture<EditsubregionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsubregionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsubregionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
