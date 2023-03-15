import { TmdbMovieService } from './tmdb-movie.service';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Movie } from '../../models/Movie.model';
import { LanguageService } from '../language/language.service';

describe('TmdbMovieService Tests:', () => {
  let tmdbMovieService: TmdbMovieService;
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
        TmdbMovieService,
        {provide: LanguageService, useValue: mockLanguageService }
      ]
    });
    injector = getTestBed();
    tmdbMovieService = injector.get(TmdbMovieService);
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('On retrieval of a movie', () => {
    it('should make a single GET request to the movie endpoint using the API key', () => {
      const movieId = '123';
      const url = 'https://api.themoviedb.org/3/movie/123?api_key=7b157a93d615cd3ca2b3312055fa550c&append_to_response=credits&language=en';
      tmdbMovieService.getMovie(movieId).subscribe((response) => {
        expect(response).toEqual({});
      });
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });
});
