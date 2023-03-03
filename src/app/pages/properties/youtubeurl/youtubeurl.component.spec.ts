import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeurlComponent } from './youtubeurl.component';

describe('YoutubeurlComponent', () => {
  let component: YoutubeurlComponent;
  let fixture: ComponentFixture<YoutubeurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
