import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsContainerComponent } from './cms-container.component';

describe('CmsContainerComponent', () => {
  let component: CmsContainerComponent;
  let fixture: ComponentFixture<CmsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
