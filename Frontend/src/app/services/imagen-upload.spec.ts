import { TestBed } from '@angular/core/testing';

import { ImagenUpload } from './imagen-upload';

describe('ImagenUpload', () => {
  let service: ImagenUpload;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenUpload);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
