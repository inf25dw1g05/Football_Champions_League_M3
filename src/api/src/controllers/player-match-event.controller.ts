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
  Player,
  MatchEvent,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerMatchEventController {
  constructor(
    @repository(PlayerRepository) protected playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/match-events', {
    responses: {
      '200': {
        description: 'Array of Player has many MatchEvent',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MatchEvent)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MatchEvent>,
  ): Promise<MatchEvent[]> {
    return this.playerRepository.events(id).find(filter);
  }

  @post('/players/{id}/match-events', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(MatchEvent)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Player.prototype.player_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchEvent, {
            title: 'NewMatchEventInPlayer',
            exclude: ['event_id'],
            optional: ['player_id']
          }),
        },
      },
    }) matchEvent: Omit<MatchEvent, 'event_id'>,
  ): Promise<MatchEvent> {
    return this.playerRepository.events(id).create(matchEvent);
  }

  @patch('/players/{id}/match-events', {
    responses: {
      '200': {
        description: 'Player.MatchEvent PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchEvent, {partial: true}),
        },
      },
    })
    matchEvent: Partial<MatchEvent>,
    @param.query.object('where', getWhereSchemaFor(MatchEvent)) where?: Where<MatchEvent>,
  ): Promise<Count> {
    return this.playerRepository.events(id).patch(matchEvent, where);
  }

  @del('/players/{id}/match-events', {
    responses: {
      '200': {
        description: 'Player.MatchEvent DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MatchEvent)) where?: Where<MatchEvent>,
  ): Promise<Count> {
    return this.playerRepository.events(id).delete(where);
  }
}
