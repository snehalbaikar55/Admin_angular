import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationURLComponent } from './location-url.component';

describe('LocationURLComponent', () => {
  let component: LocationURLComponent;
  let fixture: ComponentFixture<LocationURLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationURLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationURLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
