/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeguridadService } from './seguridad.service';

describe('SeguridadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeguridadService]
    });
  });

  it('should ...', inject([SeguridadService], (service: SeguridadService) => {
    expect(service).toBeTruthy();
  }));
});
