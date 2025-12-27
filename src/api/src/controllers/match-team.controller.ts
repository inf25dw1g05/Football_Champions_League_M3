import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Match,
  Team,
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchTeamController {
  constructor(
    @repository(MatchRepository)
    public matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/team', {
    responses: {
      '200': {
        description: 'Team belonging to Match',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Team),
          },
        },
      },
    },
  })
  async getTeam(
    @param.path.number('id') id: typeof Match.prototype.match_id,
  ): Promise<Team> {
    return this.matchRepository.homeTeam(id);
  }
}
