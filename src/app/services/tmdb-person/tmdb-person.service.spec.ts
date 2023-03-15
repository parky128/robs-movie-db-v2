import { TmdbPersonService } from './tmdb-person.service';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Movie } from '../../models/Movie.model';
import { LanguageService } from '../language/language.service';

describe('TmdbPersonService Tests:', () => {
  let tmdbPersonService: TmdbPersonService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const mockMovie: Movie = {
    title: 'Star Wars'
  };

  const mockLanguageService = {
    getLanguage: jasmine.createSpy().and.returnValue('en')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TmdbPersonService,
        {provide: LanguageService, useValue: mockLanguageService }
      ]
    });
    injector = getTestBed();
    tmdbPersonService = injector.get(TmdbPersonService);
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('On retrieval of a person record', () => {
    it('should make a single GET request to the genres endpoint using the supplied person id value', () => {
      const personId = '123';
      const url = [
        'https://api.themoviedb.org/3/person/123?api_key=7b157a93d615cd3ca2b3312055fa550c',
        '&append_to_response=movie_credits,tv_credits&language=en'
      ].join('');
      tmdbPersonService.getPerson(personId).subscribe((response) => {
        expect(response).toEqual({});
      });
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });
});
