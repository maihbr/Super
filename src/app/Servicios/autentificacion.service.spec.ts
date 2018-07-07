/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutentificacionService } from './autentificacion.service';

describe('AutentificacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutentificacionService]
    });
  });

  it('should ...', inject([AutentificacionService], (service: AutentificacionService) => {
    expect(service).toBeTruthy();
  }));
});
