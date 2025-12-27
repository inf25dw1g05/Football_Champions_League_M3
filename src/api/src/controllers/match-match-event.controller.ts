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
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchMatchEventController {
  constructor(
    @repository(MatchRepository) protected matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/match-events', {
    responses: {
      '200': {
        description: 'Array of Match has many MatchEvent',
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
    return this.matchRepository.events(id).find(filter);
  }

  @post('/matches/{id}/match-events', {
    responses: {
      '200': {
        description: 'Match model instance',
        content: {'application/json': {schema: getModelSchemaRef(MatchEvent)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Match.prototype.match_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchEvent, {
            title: 'NewMatchEventInMatch',
            exclude: ['event_id'],
            optional: ['match_id']
          }),
        },
      },
    }) matchEvent: Omit<MatchEvent, 'event_id'>,
  ): Promise<MatchEvent> {
    return this.matchRepository.events(id).create(matchEvent);
  }

  @patch('/matches/{id}/match-events', {
    responses: {
      '200': {
        description: 'Match.MatchEvent PATCH success count',
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
    return this.matchRepository.events(id).patch(matchEvent, where);
  }

  @del('/matches/{id}/match-events', {
    responses: {
      '200': {
        description: 'Match.MatchEvent DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MatchEvent)) where?: Where<MatchEvent>,
  ): Promise<Count> {
    return this.matchRepository.events(id).delete(where);
  }
}
