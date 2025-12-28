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
  Stats,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerStatsController {
  constructor(
    @repository(PlayerRepository) protected playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/stats', {
    responses: {
      '200': {
        description: 'Player has one Stats',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Stats),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Stats>,
  ): Promise<Stats> {
    return this.playerRepository.stats(id).get(filter);
  }

  @post('/players/{id}/stats', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(Stats)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Player.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stats, {
            title: 'NewStatsInPlayer',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) stats: Omit<Stats, 'id'>,
  ): Promise<Stats> {
    return this.playerRepository.stats(id).create(stats);
  }

  @patch('/players/{id}/stats', {
    responses: {
      '200': {
        description: 'Player.Stats PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stats, {partial: true}),
        },
      },
    })
    stats: Partial<Stats>,
    @param.query.object('where', getWhereSchemaFor(Stats)) where?: Where<Stats>,
  ): Promise<Count> {
    return this.playerRepository.stats(id).patch(stats, where);
  }

  @del('/players/{id}/stats', {
    responses: {
      '200': {
        description: 'Player.Stats DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Stats)) where?: Where<Stats>,
  ): Promise<Count> {
    return this.playerRepository.stats(id).delete(where);
  }
}
