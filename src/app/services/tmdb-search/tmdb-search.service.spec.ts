import { TmdbSearchService } from './tmdb-search.service';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Movie } from '../../models/Movie.model';
import { LanguageService } from '../language/language.service';

describe('TmdbSearchService Tests:', () => {
  let tmdbSearchService: TmdbSearchService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const mockLanguageService = {
    getLanguage: jasmine.createSpy().and.returnValue('en')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TmdbSearchService,
        {provide: LanguageService, useValue: mockLanguageService }
      ]
    });
    injector = getTestBed();
    tmdbSearchService = injector.get(TmdbSearchService);
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('On performing a multi search', () => {
    it('should make a single GET request to the multi search endpoint using the supplied search term value', () => {
      const searchTerm = 'foo=bar';
      const url = [
        'https://api.themoviedb.org/3/search/multi?api_key=7b157a93d615cd3ca2b3312055fa550c',
        '&query=foo=bar&language=en'
      ].join('');
      tmdbSearchService.multiSearch(searchTerm).subscribe((response) => {
        expect(response).toEqual({});
      });
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });

  describe('On performing a person search', () => {
    it('should make a single GET request to the person search endpoint using the supplied search term value', () => {
      const searchTerm = 'foo=bar';
      const url = [
        'https://api.themoviedb.org/3/search/person?api_key=7b157a93d615cd3ca2b3312055fa550c',
        '&query=foo=bar&language=en'
      ].join('');
      tmdbSearchService.personSearch(searchTerm).subscribe((response) => {
        expect(response).toEqual({});
      });
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });
});
