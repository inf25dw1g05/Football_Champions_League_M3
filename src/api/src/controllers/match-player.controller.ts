import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Match,
MatchEvent,
Player,
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchPlayerController {
  constructor(
    @repository(MatchRepository) protected matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/players', {
    responses: {
      '200': {
        description: 'Array of Match has many Player through MatchEvent',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Player)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Player>,
  ): Promise<Player[]> {
    return this.matchRepository.players(id).find(filter);
  }

  @post('/matches/{id}/players', {
    responses: {
      '200': {
        description: 'create a Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Match.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayerInMatch',
            exclude: ['id'],
          }),
        },
      },
    }) player: Omit<Player, 'id'>,
  ): Promise<Player> {
    return this.matchRepository.players(id).create(player);
  }

  @patch('/matches/{id}/players', {
    responses: {
      '200': {
        description: 'Match.Player PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Partial<Player>,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.matchRepository.players(id).patch(player, where);
  }

  @del('/matches/{id}/players', {
    responses: {
      '200': {
        description: 'Match.Player DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.matchRepository.players(id).delete(where);
  }
}
