import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdeveloperComponent } from './editdeveloper.component';

describe('EditdeveloperComponent', () => {
  let component: EditdeveloperComponent;
  let fixture: ComponentFixture<EditdeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdeveloperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
