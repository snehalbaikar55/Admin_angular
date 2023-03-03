import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaviconComponent } from './add-favicon.component';

describe('AddFaviconComponent', () => {
  let component: AddFaviconComponent;
  let fixture: ComponentFixture<AddFaviconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFaviconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFaviconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
