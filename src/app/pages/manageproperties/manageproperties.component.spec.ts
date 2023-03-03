import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepropertiesComponent } from './manageproperties.component';

describe('ManagepropertiesComponent', () => {
  let component: ManagepropertiesComponent;
  let fixture: ComponentFixture<ManagepropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagepropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagepropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
