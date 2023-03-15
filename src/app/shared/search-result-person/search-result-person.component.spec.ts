import { SearchResultPersonComponent } from './search-result-person.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ApiConfigService } from '../../services/api-config/api-config.service';
import { DatePipe } from '@angular/common';

describe('SearchResultPersonComponent', () => {
  let component: SearchResultPersonComponent;
  let fixture: ComponentFixture<SearchResultPersonComponent>;
  let mockPerson;
  const mockApiConfigService = {
    getSearchResultImageUrl: jasmine.createSpy().and.callFake((imagePath: string) => {
      return `https://www.someapi.com/images/${imagePath}`;
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultPersonComponent ],
      imports: [
      ],
      providers: [
        DatePipe,
        { provide: ApiConfigService, useValue: mockApiConfigService }
      ]
    })
    .compileComponents();
  }));

  const setupComponent = (person) => {
    fixture = TestBed.createComponent(SearchResultPersonComponent);
    component = fixture.componentInstance;

    component.personSearchResult = person;

    fixture.detectChanges();
  };

  describe('On initialisation of the component', () => {
    describe('and the person record does not have any known_for items', () => {
      beforeEach(() => {
        mockPerson = {name: 'Brad Pitt', profile_path: 'bla.jpg'};
        setupComponent(mockPerson);
      });
      it('should assign the result of getSearchResultImageUrl on the apiConfigService using the provided person profile_path value', () => {
        expect(mockApiConfigService.getSearchResultImageUrl).toHaveBeenCalledWith(mockPerson.profile_path);
        expect(component.profileUrlPath).toEqual('https://www.someapi.com/images/bla.jpg');
      });
    });
    describe('and the person record contains a single movie and single tv known for item', () => {
      beforeEach(() => {
        mockPerson = {
          name: 'Brad Pitt',
          profile_path: 'bla.jpg',
          known_for: [
            {media_type: 'movie', title: 'Fury', release_date: '2017-01-01'},
            {media_type: 'tv', name: 'Friends', first_air_date: '2008-01-01'}
          ]
        };
        setupComponent(mockPerson);
      });
      it('should assign the result of getSearchResultImageUrl on the apiConfigService using the provided person profile_path value', () => {
        expect(mockApiConfigService.getSearchResultImageUrl).toHaveBeenCalledWith(mockPerson.profile_path);
        expect(component.profileUrlPath).toEqual('https://www.someapi.com/images/bla.jpg');
      });
      it('should build a knowFor string using the movie title\release year and the tv show name\first_air_date', () => {
        expect(component.knownFor).toEqual('Fury (2017), Friends (2008)');
      });
    });
  });
});
