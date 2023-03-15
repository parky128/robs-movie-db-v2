import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TmdbSearchService } from '../services/tmdb-search/tmdb-search.service';
import { debounceTime } from 'rxjs/operators';
import { SearchResults } from '../models/SearchResults.model';
import { Router } from '@angular/router';
import { MovieSearchResult } from '../models/MovieSearchResult.model';
import { PersonSearchResult } from '../models/PersonSearchResult.model';
import { TVSearchResult } from '../models/TVSearchResult.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search = new FormControl();
  searchResults: Array<any> = [];

  constructor(
    private tmdbSearch: TmdbSearchService,
    private router: Router
  ) { }

  public clearSearch = () => {
    this.search.setValue('');
  }

  public goToMovie = (movie: MovieSearchResult) => {
    this.router.navigateByUrl(`/movie/${movie.id}`);
  }
  public goToPerson = (person: PersonSearchResult) => {
    this.router.navigateByUrl(`/person/${person.id}`);
  }
  public goToTVShow = (tv: TVSearchResult) => {
    this.router.navigateByUrl(`/tv/${tv.id}`);
  }

  private performSearch = (searchText: string) => {
    this.tmdbSearch.multiSearch(searchText).subscribe((response:any) => {
      //TODO - update the results to get the full image paths before assigning to searchResults so the shared display components can be dumb
      this.searchResults = response.results;
    });
  }

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((searchText: string) => {
      if (searchText.length > 0) {
        this.performSearch(searchText);
      } else {
        this.searchResults = [];
      }
    });
  }
}
