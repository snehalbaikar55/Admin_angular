import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedimageComponent } from './featuredimage.component';

describe('FeaturedimageComponent', () => {
  let component: FeaturedimageComponent;
  let fixture: ComponentFixture<FeaturedimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
