import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ActivatedRoute } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { from, Observable, of } from 'rxjs'
import { ApiConfigService } from '../services/api-config/api-config.service'
import { PersonComponent } from './person.component'

describe('PersonComponent', () => {
  it('mounts', () => {
    cy.mount(PersonComponent, {
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          data:  of({
            name: 'Rob'
          })
        }
      }, {
        provide: ApiConfigService,
        useValue: {

        }
      }, {provide: TranslateService, useValue: {}}],
      imports: [TranslateModule]
    })
  })
})