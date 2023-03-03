import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommericialAmmenitiesComponent } from './commericial-ammenities.component';

describe('CommericialAmmenitiesComponent', () => {
  let component: CommericialAmmenitiesComponent;
  let fixture: ComponentFixture<CommericialAmmenitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommericialAmmenitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommericialAmmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
