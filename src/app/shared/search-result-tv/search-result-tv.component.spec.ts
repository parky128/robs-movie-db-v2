import { SearchResultTVComponent } from './search-result-tv.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ApiConfigService } from '../../services/api-config/api-config.service';

describe('SearchResultTVComponent', () => {
  let component: SearchResultTVComponent;
  let fixture: ComponentFixture<SearchResultTVComponent>;

  const mockTvSearchResult = {poster_path: 'bla.jpg'};
  const mockApiConfigService = {
    getSearchResultImageUrl: jasmine.createSpy().and.callFake((imagePath: string) => {
      return `https://www.someapi.com/images/${imagePath}`;
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultTVComponent ],
      providers: [
        { provide: ApiConfigService, useValue: mockApiConfigService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTVComponent);
    component = fixture.componentInstance;

    component.tvSearchResult = mockTvSearchResult;

    fixture.detectChanges();
  });

  describe('On initialisation of the component', () => {
    it('should assign the result of getSearchResultImageUrl on the apiConfigService using the provided tv poster_path value', () => {
      expect(mockApiConfigService.getSearchResultImageUrl).toHaveBeenCalledWith(mockTvSearchResult.poster_path);
      expect(component.posterUrlPath).toEqual('https://www.someapi.com/images/bla.jpg');
    });
  });
});
