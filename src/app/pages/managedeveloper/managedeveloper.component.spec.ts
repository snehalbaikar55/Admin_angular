import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedeveloperComponent } from './managedeveloper.component';

describe('ManagedeveloperComponent', () => {
  let component: ManagedeveloperComponent;
  let fixture: ComponentFixture<ManagedeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagedeveloperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
