import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { debounceTime } from 'rxjs/operators';
import { TmdbSearchService } from '../services/tmdb-search/tmdb-search.service';
import { PersonSearchResult } from '../models/PersonSearchResult.model';
import { SearchResults } from '../models/SearchResults.model';
import { MovieSearchResult } from '../models/MovieSearchResult.model';
import { TVSearchResult } from '../models/TVSearchResult.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../models/Genre.model';
import { TmdbDiscoverService } from '../services/tmdb-discover/tmdb-discover.service';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class AdvancedSearchComponent implements OnInit {

  personSearchResults: Array<MovieSearchResult | PersonSearchResult | TVSearchResult> = [];
  selectedPersons: Array<PersonSearchResult> = [];
  genres: Array<Genre> = [];
  search = new FormControl();
  fromReleaseDateInput = new FormControl();
  toReleaseDateInput = new FormControl();
  fromReleaseDate: moment.Moment;
  toReleaseDate: moment.Moment;
  maxDate: moment.Moment;
  movieSearchResults: SearchResults | undefined;

  private selectedGenres: Array<Genre> = [];
  private searchTerm = '';

  constructor(
    private tmdbSearch: TmdbSearchService,
    private tmdbDiscover: TmdbDiscoverService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  public addSelectedPerson = (person: PersonSearchResult) => {
    this.search.setValue('');
    this.selectedPersons.push(person);
  }

  public removeSelectedPerson = (person: PersonSearchResult) => {
    this.selectedPersons.splice(this.selectedPersons.indexOf(person), 1);
  }

  public performSearch = () => {
    const searchTerms: Array<string> = [];
    const personIds = this.selectedPersons.map(person => {
      return person.id;
    }).join();
    searchTerms.push(`with_cast=${personIds}`);

    const genreIds = this.selectedGenres.map(genre => {
      return genre.id;
    }).join();
    searchTerms.push(`with_genres=${genreIds}`);
    if (this.fromReleaseDate) {
      searchTerms.push(`release_date.gte=${moment(this.fromReleaseDate).format('YYYY-MM-DD')}`);
    }
    if (this.toReleaseDate) {
      searchTerms.push(`release_date.lte=${moment(this.toReleaseDate).format('YYYY-MM-DD')}`);
    }
    this.searchTerm = searchTerms.join('&');
    this.tmdbDiscover.movieSearch(this.searchTerm).subscribe((searchResults: SearchResults) => {
      this.movieSearchResults = searchResults;
    });
  }

  public setGenres = (genre: Genre) => {
    const recIndex = this.selectedGenres.indexOf(genre);
    if (recIndex > -1) {
      this.selectedGenres.splice(recIndex, 1);
    } else {
      this.selectedGenres.push(genre);
    }
  }

  public goToMovie = (movie: MovieSearchResult) => {
    this.router.navigateByUrl(`/movie/${movie.id}`);
  }

  public clearFromReleaseDate = () => {
    this.fromReleaseDateInput.setValue(null);
  }

  public clearToReleaseDate = () => {
    this.toReleaseDateInput.setValue(null);
  }

  public clearSearch = () => {
    this.search.setValue('');
    this.selectedPersons = [];
    this.selectedGenres = [];
    this.fromReleaseDateInput.setValue(null);
    this.toReleaseDateInput.setValue(null);
    this.movieSearchResults = undefined;
  }

  public genreSelected = (genre: Genre) => {
    return this.selectedGenres.indexOf(genre) > -1;
  }

  public getResultsPage = (page: number) => {
    this.searchTerm += `&page=${page}`;
    this.tmdbDiscover.movieSearch(this.searchTerm).subscribe((searchResults: SearchResults) => {
      this.movieSearchResults = searchResults;
    });
  }

  private searchPersons = (searchText: string) => {
    this.tmdbSearch.personSearch(searchText).subscribe((response: SearchResults) => {
      this.personSearchResults = response.results;
    });
  }

  ngOnInit() {
    this.genres = this.route.snapshot.data['genres'].genres; //YUK - sort this
    this.maxDate = moment();
    this.search.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((searchText: string) => {
      if (searchText.length > 0) {
        this.searchPersons(searchText);
      } else {
        this.personSearchResults = [];
      }
    });
    this.fromReleaseDateInput.valueChanges.subscribe((value) => {
      this.fromReleaseDate = value;
    });
    this.toReleaseDateInput.valueChanges.subscribe((value) => {
      this.toReleaseDate = value;
    });
  }

}
