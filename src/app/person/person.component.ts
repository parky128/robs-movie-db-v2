import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../models/Person.model';
import { ApiConfigService } from '../services/api-config/api-config.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person: Person;
  personProfileUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiConfigService: ApiConfigService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ person }) => {
      this.person = person;
      if(this.person.profile_path) {
        this.personProfileUrl = this.apiConfigService.getPersonProfileUrl(this.person.profile_path);
      }
    });
  }
}
