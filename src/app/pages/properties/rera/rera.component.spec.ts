import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReraComponent } from './rera.component';

describe('ReraComponent', () => {
  let component: ReraComponent;
  let fixture: ComponentFixture<ReraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
