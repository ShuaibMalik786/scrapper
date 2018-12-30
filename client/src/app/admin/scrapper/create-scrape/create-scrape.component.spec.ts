import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScrapeComponent } from './create-scrape.component';

describe('CreateScrapeComponent', () => {
  let component: CreateScrapeComponent;
  let fixture: ComponentFixture<CreateScrapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateScrapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScrapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
