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
import {Stats} from '../models';
import {StatsRepository} from '../repositories';

export class StatsController {
  constructor(
    @repository(StatsRepository)
    public statsRepository : StatsRepository,
  ) {}

  @post('/stats')
  @response(200, {
    description: 'Stats model instance',
    content: {'application/json': {schema: getModelSchemaRef(Stats)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stats, {
            title: 'NewStats',
            exclude: ['id'],
          }),
        },
      },
    })
    stats: Omit<Stats, 'id'>,
  ): Promise<Stats> {
    return this.statsRepository.create(stats);
  }

  @get('/stats/count')
  @response(200, {
    description: 'Stats model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Stats) where?: Where<Stats>,
  ): Promise<Count> {
    return this.statsRepository.count(where);
  }

  @get('/stats')
  @response(200, {
    description: 'Array of Stats model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Stats, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Stats) filter?: Filter<Stats>,
  ): Promise<Stats[]> {
    return this.statsRepository.find(filter);
  }

  @patch('/stats')
  @response(200, {
    description: 'Stats PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stats, {partial: true}),
        },
      },
    })
    stats: Stats,
    @param.where(Stats) where?: Where<Stats>,
  ): Promise<Count> {
    return this.statsRepository.updateAll(stats, where);
  }

  @get('/stats/{id}')
  @response(200, {
    description: 'Stats model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Stats, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Stats, {exclude: 'where'}) filter?: FilterExcludingWhere<Stats>
  ): Promise<Stats> {
    return this.statsRepository.findById(id, filter);
  }

  @patch('/stats/{id}')
  @response(204, {
    description: 'Stats PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stats, {partial: true}),
        },
      },
    })
    stats: Stats,
  ): Promise<void> {
    await this.statsRepository.updateById(id, stats);
  }

  @put('/stats/{id}')
  @response(204, {
    description: 'Stats PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() stats: Stats,
  ): Promise<void> {
    await this.statsRepository.replaceById(id, stats);
  }

  @del('/stats/{id}')
  @response(204, {
    description: 'Stats DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.statsRepository.deleteById(id);
  }
}
