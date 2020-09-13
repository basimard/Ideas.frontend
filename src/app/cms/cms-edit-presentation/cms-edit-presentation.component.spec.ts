import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsEditPresentationComponent } from './cms-edit-presentation.component';

describe('CmsEditPresentationComponent', () => {
  let component: CmsEditPresentationComponent;
  let fixture: ComponentFixture<CmsEditPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsEditPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsEditPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
