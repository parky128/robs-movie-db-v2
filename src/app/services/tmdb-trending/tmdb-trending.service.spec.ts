import { TmdbTrendingService } from './tmdb-trending.service';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LanguageService } from '../language/language.service';

describe('TmdbTrendingService Tests:', () => {
  let tmdbTrendingService: TmdbTrendingService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const mockLanguageService = {
    getLanguage: jasmine.createSpy().and.returnValue('en')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TmdbTrendingService,
        {provide: LanguageService, useValue: mockLanguageService }
      ]
    });
    injector = getTestBed();
    tmdbTrendingService = injector.get(TmdbTrendingService);
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('On rerieving the weekly trend', () => {
    it('should make a single GET request to the trending week endpoint for the supplied media type', () => {
      const mediaType = 'movie';
      const url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=7b157a93d615cd3ca2b3312055fa550c&language=en';
      tmdbTrendingService.getWeeklyTrend(mediaType).subscribe((response) => {
        expect(response).toEqual({});
      });
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });
});
