import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeokeywordsComponent } from './seokeywords.component';

describe('SeokeywordsComponent', () => {
  let component: SeokeywordsComponent;
  let fixture: ComponentFixture<SeokeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeokeywordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeokeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
