import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersPropertyComponent } from './developers-property.component';

describe('DevelopersPropertyComponent', () => {
  let component: DevelopersPropertyComponent;
  let fixture: ComponentFixture<DevelopersPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopersPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopersPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
