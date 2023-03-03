import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyLocationComponent } from './nearby-location.component';

describe('NearbyLocationComponent', () => {
  let component: NearbyLocationComponent;
  let fixture: ComponentFixture<NearbyLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearbyLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
