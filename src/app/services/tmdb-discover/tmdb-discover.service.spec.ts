import { TmdbDiscoverService } from './tmdb-discover.service';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LanguageService } from '../language/language.service';

describe('TmdbDiscoverService Tests:', () => {
  let tmdbDiscoverService: TmdbDiscoverService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const mockLanguageService = {
    getLanguage: jasmine.createSpy().and.returnValue('en')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TmdbDiscoverService,
        {provide: LanguageService, useValue: mockLanguageService }
      ]
    });
    injector = getTestBed();
    tmdbDiscoverService = injector.get(TmdbDiscoverService);
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('When searching for movies', () => {
    it('should make a single GET request to the discover endpoint using the supplied search term as a query parameter', () => {
      const searchTerm = 'foo=bar';
      const url = 'https://api.themoviedb.org/3/discover/movie?api_key=7b157a93d615cd3ca2b3312055fa550c&foo=bar&language=en';
      tmdbDiscoverService.movieSearch(searchTerm).subscribe((response) => {
        expect(response).toEqual({});
      });
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });
});
