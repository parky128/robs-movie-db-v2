import { ComponentFixture, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { AdvancedSearchComponent } from './advanced-search.component';
import { MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TmdbDiscoverService } from '../services/tmdb-discover/tmdb-discover.service';
import { TmdbSearchService } from '../services/tmdb-search/tmdb-search.service';
import { NO_ERRORS_SCHEMA  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';

describe('AdvancedSearchComponent Tests:', () => {
  let component: AdvancedSearchComponent;
  let fixture: ComponentFixture<AdvancedSearchComponent>;

  const genres = [{title: 'Star Wars'}];

  const activateRouteStub = {
    snapshot: {
      data: {
        genres: genres
      }
    }
  };
  const mockPersonSearchResults = {
    results: [{name: 'Rob Parker'}]
  };
  const mockMovieSearchResults = {
    results: [{title: 'Fight Club'}]
  };
  const mockTmdbSearchService = {
    personSearch: jasmine.createSpy().and.returnValue(of(mockPersonSearchResults))
  };
  const mockTmdbDiscoverService = {
    movieSearch: jasmine.createSpy().and.returnValue(of(mockMovieSearchResults))
  };
  const mockRouter = {
    navigateByUrl: jasmine.createSpy()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedSearchComponent ],
      imports: [
        MatAutocompleteModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TmdbSearchService, useValue: mockTmdbSearchService },
        { provide: TmdbDiscoverService, useValue: mockTmdbDiscoverService },
        { provide: ActivatedRoute, useValue: activateRouteStub },
        { provide: Router, useValue: mockRouter}
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On adding a selected person', () => {
    it('should add the supplied person record to the selectedPersons array property', () => {
      const person = {name: 'Rob Parker'};
      component.addSelectedPerson(person);
      expect(component.selectedPersons).toContain(person);
      expect(component.selectedPersons.length).toEqual(1);
    });
  });
  describe('On removing a selected person', () => {
    it('should remove a matching item from the selectedPersons array that matches the supplied person', () => {
      const person = {name: 'Rob Parker'};
      component.addSelectedPerson(person);
      component.removeSelectedPerson(person);
      expect(component.selectedPersons.length).toEqual(0);
    });
  });
  describe('On performing a search', () => {
    describe('when a person, genre, from and to release dates have been set', () => {
      it('should construct the correct search term and supply to the movieSearch', () => {
        component.selectedPersons = [{id: 1, name: 'Rob Parker'}];
        component.setGenres({id: 456});
        component.fromReleaseDate = moment('01-01-2018', 'DD-MM-YYYY');
        component.toReleaseDate = moment('31-08-2018', 'DD-MM-YYYY');
        fixture.detectChanges();
        component.performSearch();
        const searchTerm = 'with_cast=1&with_genres=456&release_date.gte=2018-01-01&release_date.lte=2018-08-31';
        expect(mockTmdbDiscoverService.movieSearch).toHaveBeenCalledWith(searchTerm);
      });
    });
    describe('when a person only a person has been set', () => {
      beforeEach(() => {
        component.selectedPersons = [{id: 1, name: 'Rob Parker'}];
        fixture.detectChanges();
        component.performSearch();
      });
      it('should construct the correct search term and supply to the movieSearch', () => {
        const searchTerm = 'with_cast=1&with_genres=';
        expect(mockTmdbDiscoverService.movieSearch).toHaveBeenCalledWith(searchTerm);
      });
      describe('and a new page of results is requested', () => {
        it('should append the page number as new param to the existing search term', () => {
          const searchTerm = 'with_cast=1&with_genres=&page=2';
          component.getResultsPage(2);
          expect(mockTmdbDiscoverService.movieSearch).toHaveBeenCalledWith(searchTerm);
        });
      });
    });
  });
  describe('when navigating to a movie record', () => {
    it('should call navigateByUrl on the router service using the supplied movie id', () => {
      const movieSearchResult = {id: 123};
      component.goToMovie(movieSearchResult);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`/movie/${movieSearchResult.id}`);
    });
  });
  describe('on clearing the from release date field', () => {
    it('should set the fromReleaseDateInput value to null', () => {
      component.clearFromReleaseDate();
      expect(component.fromReleaseDateInput.value).toBe(null);
    });
  });
  describe('on clearing the to release date field', () => {
    it('should set the fromReleaseDateInput value to null', () => {
      component.clearToReleaseDate();
      expect(component.toReleaseDateInput.value).toBe(null);
    });
  });
  describe('when the value of the search input changes', () => {
    it('should perform a person search', fakeAsync(() => {
      const personSearchTerm = 'brad';
      component.search.setValue(personSearchTerm);
      tick(3000);
      fixture.detectChanges();
      expect(mockTmdbSearchService.personSearch).toHaveBeenCalledWith(personSearchTerm);
      expect(component.personSearchResults).toEqual(mockPersonSearchResults.results);
    }));
  });
});
