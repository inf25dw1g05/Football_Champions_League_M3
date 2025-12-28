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
import {Standings} from '../models';
import {StandingsRepository} from '../repositories';

export class StandingsController {
  constructor(
    @repository(StandingsRepository)
    public standingsRepository : StandingsRepository,
  ) {}

  @post('/standings')
  @response(200, {
    description: 'Standings model instance',
    content: {'application/json': {schema: getModelSchemaRef(Standings)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Standings, {
            title: 'NewStandings',
            exclude: ['id'],
          }),
        },
      },
    })
    standings: Omit<Standings, 'id'>,
  ): Promise<Standings> {
    return this.standingsRepository.create(standings);
  }

  @get('/standings/count')
  @response(200, {
    description: 'Standings model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Standings) where?: Where<Standings>,
  ): Promise<Count> {
    return this.standingsRepository.count(where);
  }

  @get('/standings')
  @response(200, {
    description: 'Array of Standings model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Standings, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Standings) filter?: Filter<Standings>,
  ): Promise<Standings[]> {
    return this.standingsRepository.find(filter);
  }

  @patch('/standings')
  @response(200, {
    description: 'Standings PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Standings, {partial: true}),
        },
      },
    })
    standings: Standings,
    @param.where(Standings) where?: Where<Standings>,
  ): Promise<Count> {
    return this.standingsRepository.updateAll(standings, where);
  }

  @get('/standings/{id}')
  @response(200, {
    description: 'Standings model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Standings, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Standings, {exclude: 'where'}) filter?: FilterExcludingWhere<Standings>
  ): Promise<Standings> {
    return this.standingsRepository.findById(id, filter);
  }

  @patch('/standings/{id}')
  @response(204, {
    description: 'Standings PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Standings, {partial: true}),
        },
      },
    })
    standings: Standings,
  ): Promise<void> {
    await this.standingsRepository.updateById(id, standings);
  }

  @put('/standings/{id}')
  @response(204, {
    description: 'Standings PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() standings: Standings,
  ): Promise<void> {
    await this.standingsRepository.replaceById(id, standings);
  }

  @del('/standings/{id}')
  @response(204, {
    description: 'Standings DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.standingsRepository.deleteById(id);
  }
}
