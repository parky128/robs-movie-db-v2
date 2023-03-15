import { ApiConfigService } from './api-config.service';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIConfigModel } from '../../models/apiConfig.model';

describe('ApiConfigService Tests:', () => {
  let apiConfigService: ApiConfigService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const mockApiConfigResponse: APIConfigModel = {
    images: {
      base_url: 'https://www.somewhere.com/'
    },
    change_keys: []
  };

  const imagePath = 'image.jpg';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiConfigService
      ]
    });
    injector = getTestBed();
    apiConfigService = injector.get(ApiConfigService);
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('On retrieval of the API config', () => {
    it('should make a single GET request to the apiConfig endpoint using the correct API key', () => {
      apiConfigService.getApiConfig().then(() => {
        expect(apiConfigService.apiConfig).toBe(mockApiConfigResponse);
      });
      const req = httpMock.expectOne('https://api.themoviedb.org/3/configuration?api_key=7b157a93d615cd3ca2b3312055fa550c');
      expect(req.request.method).toBe('GET');
      req.flush(mockApiConfigResponse);
    });
  });

  describe('Image url helpers: ', () => {
    beforeEach(() => {
      apiConfigService.apiConfig = mockApiConfigResponse;
    });
    it('should return a correctly constructed image url using the supplied image path', () => {
      expect(apiConfigService.getSearchResultImageUrl(imagePath))
        .toEqual(`https://www.somewhere.com/w92/${imagePath}`);
    });
    it('should return a correctly constructed movie url using the supplied image path', () => {
      expect(apiConfigService.getMoviePosterUrl(imagePath))
        .toEqual(`https://www.somewhere.com/w185/${imagePath}`);
    });
    it('should return a correctly constructed person profile url using the supplied image path', () => {
      expect(apiConfigService.getPersonProfileUrl(imagePath))
        .toEqual(`https://www.somewhere.com/w185/${imagePath}`);
    });
    it('should return a correctly constructed cast profile url using the supplied image path', () => {
      expect(apiConfigService.getCastProfileUrl(imagePath))
        .toEqual(`https://www.somewhere.com/w45/${imagePath}`);
    });
  });

});
