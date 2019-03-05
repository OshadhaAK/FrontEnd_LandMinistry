import { TestBed } from '@angular/core/testing';

import { MainProjectService } from './main-project.service';

describe('MainProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainProjectService = TestBed.get(MainProjectService);
    expect(service).toBeTruthy();
  });
});
