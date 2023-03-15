import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PersonComponent } from './person.component';
import { ApiConfigService } from '../services/api-config/api-config.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PersonComponent Tests:', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  const mockPerson = {
    name: 'Rob Parker',
    profile_path: 'bla.jpg'
  };

  const mockApiConfigService = {
    getPersonProfileUrl: jasmine.createSpy().and.callFake((imagePath: string) => {
      return `https://www.someapi.com/images/${imagePath}`;
    })
  };

  const activateRouteStub = {
    snapshot: {
      data: {
        person: mockPerson
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonComponent ],
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
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On initialising the component', () => {
    it('should assign the value of the activate route person data property', () => {
      expect(component.person).toEqual(mockPerson);
    });
    it('should call getPersonProfileUrl on the apiConfigService with the current person profile_path value', () => {
      expect(mockApiConfigService.getPersonProfileUrl).toHaveBeenCalledWith(mockPerson.profile_path);
    });
    it('should call assign the result of calling getPersonProfileUrl on the apiConfigService to the personProfileUrl property', () => {
      expect(component.personProfileUrl).toEqual(`https://www.someapi.com/images/${mockPerson.profile_path}`);
    });
  });
});
