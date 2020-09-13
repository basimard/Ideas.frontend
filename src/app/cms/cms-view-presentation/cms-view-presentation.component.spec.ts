import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsViewPresentationComponent } from './cms-view-presentation.component';

describe('CmsViewPresentationComponent', () => {
  let component: CmsViewPresentationComponent;
  let fixture: ComponentFixture<CmsViewPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsViewPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsViewPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
