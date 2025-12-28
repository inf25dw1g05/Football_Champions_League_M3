import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {MatchEvent} from '../models';
import {MatchEventRepository} from '../repositories';

export class MatchEventController {
  constructor(
    @repository(MatchEventRepository)
    public matchEventRepository : MatchEventRepository,
  ) {}

  @post('/match-events')
  @response(200, {
    description: 'MatchEvent model instance',
    content: {'application/json': {schema: getModelSchemaRef(MatchEvent)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchEvent, {
            title: 'NewMatchEvent',
            exclude: ['id'],
          }),
        },
      },
    })
    matchEvent: Omit<MatchEvent, 'id'>,
  ): Promise<MatchEvent> {
    return this.matchEventRepository.create(matchEvent);
  }

  @get('/match-events/count')
  @response(200, {
    description: 'MatchEvent model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MatchEvent) where?: Where<MatchEvent>,
  ): Promise<Count> {
    return this.matchEventRepository.count(where);
  }

  @get('/match-events')
  @response(200, {
    description: 'Array of MatchEvent model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MatchEvent, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MatchEvent) filter?: Filter<MatchEvent>,
  ): Promise<MatchEvent[]> {
    return this.matchEventRepository.find(filter);
  }

  @patch('/match-events')
  @response(200, {
    description: 'MatchEvent PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchEvent, {partial: true}),
        },
      },
    })
    matchEvent: MatchEvent,
    @param.where(MatchEvent) where?: Where<MatchEvent>,
  ): Promise<Count> {
    return this.matchEventRepository.updateAll(matchEvent, where);
  }

  @get('/match-events/{id}')
  @response(200, {
    description: 'MatchEvent model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MatchEvent, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MatchEvent, {exclude: 'where'}) filter?: FilterExcludingWhere<MatchEvent>
  ): Promise<MatchEvent> {
    return this.matchEventRepository.findById(id, filter);
  }

  @patch('/match-events/{id}')
  @response(204, {
    description: 'MatchEvent PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchEvent, {partial: true}),
        },
      },
    })
    matchEvent: MatchEvent,
  ): Promise<void> {
    await this.matchEventRepository.updateById(id, matchEvent);
  }

  @put('/match-events/{id}')
  @response(204, {
    description: 'MatchEvent PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() matchEvent: MatchEvent,
  ): Promise<void> {
    await this.matchEventRepository.replaceById(id, matchEvent);
  }

  @del('/match-events/{id}')
  @response(204, {
    description: 'MatchEvent DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.matchEventRepository.deleteById(id);
  }
}
