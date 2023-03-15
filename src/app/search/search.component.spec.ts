import { ComponentFixture, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchComponent } from './search.component';
import { TmdbSearchService } from '../services/tmdb-search/tmdb-search.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('SearchComponent Tests:', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const mockSearchResults = {
    results: [{name: 'Rob Parker'}]
  };
  const mockTmdbSearchService = {
    multiSearch: jasmine.createSpy().and.returnValue(of(mockSearchResults))
  };
  const mockRouter = {
    navigateByUrl: jasmine.createSpy()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent
      ],
      imports: [
        MatAutocompleteModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: TmdbSearchService, useValue: mockTmdbSearchService },
        { provide: Router, useValue: mockRouter}
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when the value of the search input changes', () => {
    it('should perform a person search using the supplied search term value', fakeAsync(() => {
      const personSearchTerm = 'brad';
      component.search.setValue(personSearchTerm);
      tick(3000);
      fixture.detectChanges();
      expect(mockTmdbSearchService.multiSearch).toHaveBeenCalledWith(personSearchTerm);
      expect(component.searchResults ).toEqual(mockSearchResults.results);
    }));
  });
  describe('when navigating to a movie record', () => {
    it('should call navigateByUrl on the router service using the supplied movie id', () => {
      const movieSearchResult = {id: 123};
      component.goToMovie(movieSearchResult);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`/movie/${movieSearchResult.id}`);
    });
  });
  describe('when navigating to a person record', () => {
    it('should call navigateByUrl on the router service using the supplied person id', () => {
      const personSearchResult = {id: 123};
      component.goToPerson(personSearchResult);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`/person/${personSearchResult.id}`);
    });
  });
  describe('when navigating to a tv show record', () => {
    it('should call navigateByUrl on the router service using the supplied tv show id', () => {
      const tvShowSearchResult = {id: 123};
      component.goToTVShow(tvShowSearchResult);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`/movie/${tvShowSearchResult.id}`);
    });
  });
  describe('when clearing the search', () => {
    it('should set the search results to an empty array', () => {
      component.clearSearch();
      expect(component.searchResults).toEqual([]);
    });
  });
});
