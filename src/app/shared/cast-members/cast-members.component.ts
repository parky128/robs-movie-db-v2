import { Component, Input } from '@angular/core';
import { TVCast } from 'src/app/models/TVCast.model';
import { ApiConfigService } from '../../services/api-config/api-config.service';

@Component({
  selector: 'app-cast-members',
  templateUrl: './cast-members.component.html',
  styleUrls: ['./cast-members.component.scss']
})

export class CastMembersComponent {
  @Input() castMembers: TVCast[] | undefined;
  posterUrlPath: string;

  constructor(
    private apiConfigService: ApiConfigService
  ) {
  }

  public getCastMemberImageUrl = (profilePath: string) => {
    return this.apiConfigService.getCastProfileUrl(profilePath);
  }
}
