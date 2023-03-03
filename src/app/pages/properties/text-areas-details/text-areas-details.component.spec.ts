import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreasDetailsComponent } from './text-areas-details.component';

describe('TextAreasDetailsComponent', () => {
  let component: TextAreasDetailsComponent;
  let fixture: ComponentFixture<TextAreasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAreasDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
