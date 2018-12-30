import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedHTMLComponent } from './feed-html.component';

describe('FeedHTMLComponent', () => {
  let component: FeedHTMLComponent;
  let fixture: ComponentFixture<FeedHTMLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedHTMLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedHTMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
