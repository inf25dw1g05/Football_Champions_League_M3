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
  Player,
} from '../models';
import {MatchEventRepository} from '../repositories';

export class MatchEventPlayerController {
  constructor(
    @repository(MatchEventRepository)
    public matchEventRepository: MatchEventRepository,
  ) { }

  @get('/match-events/{id}/player', {
    responses: {
      '200': {
        description: 'Player belonging to MatchEvent',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Player),
          },
        },
      },
    },
  })
  async getPlayer(
    @param.path.number('id') id: typeof MatchEvent.prototype.id,
  ): Promise<Player> {
    return this.matchEventRepository.player(id);
  }
}
