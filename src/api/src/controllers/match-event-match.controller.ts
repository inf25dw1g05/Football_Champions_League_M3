import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MatchEvent,
  Match,
} from '../models';
import {MatchEventRepository} from '../repositories';

export class MatchEventMatchController {
  constructor(
    @repository(MatchEventRepository)
    public matchEventRepository: MatchEventRepository,
  ) { }

  @get('/match-events/{id}/match', {
    responses: {
      '200': {
        description: 'Match belonging to MatchEvent',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Match),
          },
        },
      },
    },
  })
  async getMatch(
    @param.path.number('id') id: typeof MatchEvent.prototype.event_id,
  ): Promise<Match> {
    return this.matchEventRepository.match(id);
  }
}
