/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoLiveService } from './go-live.service';

describe('Service: GoLive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoLiveService]
    });
  });

  it('should ...', inject([GoLiveService], (service: GoLiveService) => {
    expect(service).toBeTruthy();
  }));
});
