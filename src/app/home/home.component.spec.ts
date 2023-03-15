import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MatCardModule, MatListModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiConfigService } from '../services/api-config/api-config.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent Tests:', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const movies = [{title: 'Star Wars'}];
  const shows = [{name: 'Game of Thrones'}];

  const activateRouteStub = {
    snapshot: {
      data: {
        trendingMovies: movies,
        trendingShows: shows
      }
    }
  };
  const mockApiConfigService = {
    getTrendingItemImageUrl: jasmine.createSpy()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On initialisation of the component', () => {
    it('should assign the value of trendingMovies from the currently activated route data property', () => {
      expect(component.trendingMovies).toEqual(activateRouteStub.snapshot.data.trendingMovies);
    });
    it('should assign the value of trendingShows from the currently activated route data property', () => {
      expect(component.trendingShows).toEqual(activateRouteStub.snapshot.data.trendingShows);
    });
  });

  describe('When retrieving a posterUrlPath for a given movie record', () => {
    it('should call getTrendingItemImageUrl on the apiConfigService using the supplied movie poster_path value', () => {
      const posterPath = '/bla.jpg';
      component.posterUrlPath(posterPath);
      expect(mockApiConfigService.getTrendingItemImageUrl).toHaveBeenCalledWith(posterPath);
    });
  });
});
