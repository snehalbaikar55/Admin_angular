import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagelogsComponent } from './managelogs.component';

describe('ManagelogsComponent', () => {
  let component: ManagelogsComponent;
  let fixture: ComponentFixture<ManagelogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagelogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagelogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
