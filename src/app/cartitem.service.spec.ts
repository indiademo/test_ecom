import { TestBed, inject } from '@angular/core/testing';

import { CartitemService } from './cartitem.service';

describe('CartitemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartitemService]
    });
  });

  it('should be created', inject([CartitemService], (service: CartitemService) => {
    expect(service).toBeTruthy();
  }));
});
