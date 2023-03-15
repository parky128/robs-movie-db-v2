import { TmdbGenreService } from './tmdb-genre.service';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Movie } from '../../models/Movie.model';
import { LanguageService } from '../language/language.service';

describe('TmdbGenreService Tests:', () => {
  let tmdbGenreService: TmdbGenreService;
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
        TmdbGenreService,
        {provide: LanguageService, useValue: mockLanguageService }
      ]
    });
    injector = getTestBed();
    tmdbGenreService = injector.get(TmdbGenreService);
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('On retrieval of genres', () => {
    it('should make a single GET request to the genres endpoint using the API key', () => {
      const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=7b157a93d615cd3ca2b3312055fa550c&language=en';
      tmdbGenreService.getGenres().subscribe((response) => {
        expect(response).toEqual({});
      });
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });
});
