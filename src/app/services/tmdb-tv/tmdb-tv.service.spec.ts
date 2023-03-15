import { TmdbTvService } from './tmdb-tv.service';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LanguageService } from '../language/language.service';

describe('TmdbTvService Tests:', () => {
  let tmdbTvService: TmdbTvService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const mockLanguageService = {
    getLanguage: jasmine.createSpy().and.returnValue('en')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TmdbTvService,
        {provide: LanguageService, useValue: mockLanguageService }
      ]
    });
    injector = getTestBed();
    tmdbTvService = injector.get(TmdbTvService);
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('On retrieval of a tv record', () => {
    it('should make a single GET request to the tv endpoint using the supplied tv id value', () => {
      const tvId = '123';
      const url = [
        'https://api.themoviedb.org/3/tv/123?api_key=7b157a93d615cd3ca2b3312055fa550c',
        '&append_to_response=credits&language=en'
      ].join('');
      tmdbTvService.getTv(tvId).subscribe((response) => {
        expect(response).toEqual({});
      });
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });
});
