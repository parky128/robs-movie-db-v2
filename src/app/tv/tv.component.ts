import { Component, OnInit } from '@angular/core';
import { TVShow } from '../models/TVShow.model';
import { ActivatedRoute } from '@angular/router';
import { ApiConfigService } from '../services/api-config/api-config.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {

  tvShow: TVShow;
  tvShowPosterUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiConfigService: ApiConfigService
  ) { }

  public getCastMemberImageUrl = (profilePath: string) => {
    return this.apiConfigService.getCastProfileUrl(profilePath);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tvShow }) => {
      this.tvShow = tvShow;
      if(this.tvShow.poster_path) {
        this.tvShowPosterUrl = this.apiConfigService.getMoviePosterUrl(this.tvShow.poster_path)
      }
    });
  }
}
