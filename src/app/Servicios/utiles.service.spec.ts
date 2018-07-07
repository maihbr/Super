/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilesService } from './utiles.service';

describe('UtilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilesService]
    });
  });

  it('should ...', inject([UtilesService], (service: UtilesService) => {
    expect(service).toBeTruthy();
  }));
});
