import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddeveloperComponent } from './adddeveloper.component';

describe('AdddeveloperComponent', () => {
  let component: AdddeveloperComponent;
  let fixture: ComponentFixture<AdddeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddeveloperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
