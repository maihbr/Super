import { TestBed, inject } from '@angular/core/testing';

import { CestaService } from './cesta.service';

describe('CestaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CestaService]
    });
  });

  it('should be created', inject([CestaService], (service: CestaService) => {
    expect(service).toBeTruthy();
  }));
});
