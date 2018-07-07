/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LispedidosComponent } from './lispedidos.component';

describe('LispedidosComponent', () => {
  let component: LispedidosComponent;
  let fixture: ComponentFixture<LispedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LispedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LispedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
