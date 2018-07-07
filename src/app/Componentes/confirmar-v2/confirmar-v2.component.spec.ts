import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarV2Component } from './confirmar-v2.component';

describe('ConfirmarV2Component', () => {
  let component: ConfirmarV2Component;
  let fixture: ComponentFixture<ConfirmarV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
