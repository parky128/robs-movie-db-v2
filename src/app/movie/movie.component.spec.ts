import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import {
  MatCardModule,
  MatExpansionModule
} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MovieComponent } from './movie.component';
import { ApiConfigService } from '../services/api-config/api-config.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MovieComponent Tests:', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  const mockMovie = {
    name: 'Fight Club',
    poster_path: 'bla.jpg',
    credits: {
      cast: [{
        name: 'Rob Parker',
        character: 'Himself'
      }]
    }
  };

  const mockApiConfigService = {
    getMoviePosterUrl: jasmine.createSpy().and.callFake((imagePath: string) => {
      return `https://www.someapi.com/images/${imagePath}`;
    }),
    getCastProfileUrl: jasmine.createSpy().and.callFake((imagePath: string) => {
      return `https://www.someapi.com/images/${imagePath}`;
    })
  };

  const activateRouteStub = {
    snapshot: {
      data: {
        movie: mockMovie
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieComponent ],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activateRouteStub },
        { provide: ApiConfigService, useValue: mockApiConfigService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On initialising the component', () => {
    it('should assign the value of the activate route movie data property', () => {
      expect(component.movie).toEqual(mockMovie);
    });
    it('should call getMoviePosterUrl on the apiConfigService with the current movie poster_path value', () => {
      expect(mockApiConfigService.getMoviePosterUrl).toHaveBeenCalledWith(mockMovie.poster_path);
    });
    it('should call assign the result of calling getMoviePosterUrl on the apiConfigService to the tvShowPosterUrl property', () => {
      expect(component.moviePosterUrl ).toEqual(`https://www.someapi.com/images/${mockMovie.poster_path}`);
    });
  });
  describe('When building a cast member image url', () => {
    it('should call getCastProfileUrl on the apiConfigService the current tv show poster_path value', () => {
      const castMember = {name: 'Rob Parker', profile_path: 'bla.jpg'};
      component.getCastMemberImageUrl(castMember);
      expect(mockApiConfigService.getCastProfileUrl).toHaveBeenCalledWith(castMember.profile_path);
    });
  });
});
