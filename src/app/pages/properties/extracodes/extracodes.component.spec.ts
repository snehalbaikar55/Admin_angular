import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtracodesComponent } from './extracodes.component';

describe('ExtracodesComponent', () => {
  let component: ExtracodesComponent;
  let fixture: ComponentFixture<ExtracodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtracodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtracodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
