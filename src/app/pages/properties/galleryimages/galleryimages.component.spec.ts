import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryimagesComponent } from './galleryimages.component';

describe('GalleryimagesComponent', () => {
  let component: GalleryimagesComponent;
  let fixture: ComponentFixture<GalleryimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryimagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
