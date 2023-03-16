import { SearchResultMovieComponent } from './search-result-movie.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ApiConfigService } from '../../services/api-config/api-config.service';

describe('SearchResultMovieComponent', () => {
  let component: SearchResultMovieComponent;
  let fixture: ComponentFixture<SearchResultMovieComponent>;

  const mockMovie = {poster_path: 'bla.jpg'};
  const mockApiConfigService = {
    getSearchResultImageUrl: jasmine.createSpy().and.callFake((imagePath: string) => {
      return `https://www.someapi.com/images/${imagePath}`;
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultMovieComponent ],
      providers: [
        { provide: ApiConfigService, useValue: mockApiConfigService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultMovieComponent);
    component = fixture.componentInstance;

    component.movieSearchResult = mockMovie;

    fixture.detectChanges();
  });

  describe('On initialisation of the component', () => {
    it('should assign the result of getSearchResultImageUrl on the apiConfigService using the provided movie poster_path value', () => {
      expect(mockApiConfigService.getSearchResultImageUrl).toHaveBeenCalledWith(mockMovie.poster_path);
      expect(component.posterUrlPath).toEqual('https://www.someapi.com/images/bla.jpg');
    });
  });
});
