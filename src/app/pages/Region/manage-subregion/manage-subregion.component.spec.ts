import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubregionComponent } from './manage-subregion.component';

describe('ManageSubregionComponent', () => {
  let component: ManageSubregionComponent;
  let fixture: ComponentFixture<ManageSubregionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubregionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubregionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
