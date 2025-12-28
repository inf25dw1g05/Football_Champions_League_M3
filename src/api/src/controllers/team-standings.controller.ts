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
  Team,
  Standings,
} from '../models';
import {TeamRepository} from '../repositories';

export class TeamStandingsController {
  constructor(
    @repository(TeamRepository) protected teamRepository: TeamRepository,
  ) { }

  @get('/teams/{id}/standings', {
    responses: {
      '200': {
        description: 'Team has one Standings',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Standings),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Standings>,
  ): Promise<Standings> {
    return this.teamRepository.standings(id).get(filter);
  }

  @post('/teams/{id}/standings', {
    responses: {
      '200': {
        description: 'Team model instance',
        content: {'application/json': {schema: getModelSchemaRef(Standings)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Team.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Standings, {
            title: 'NewStandingsInTeam',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) standings: Omit<Standings, 'id'>,
  ): Promise<Standings> {
    return this.teamRepository.standings(id).create(standings);
  }

  @patch('/teams/{id}/standings', {
    responses: {
      '200': {
        description: 'Team.Standings PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Standings, {partial: true}),
        },
      },
    })
    standings: Partial<Standings>,
    @param.query.object('where', getWhereSchemaFor(Standings)) where?: Where<Standings>,
  ): Promise<Count> {
    return this.teamRepository.standings(id).patch(standings, where);
  }

  @del('/teams/{id}/standings', {
    responses: {
      '200': {
        description: 'Team.Standings DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Standings)) where?: Where<Standings>,
  ): Promise<Count> {
    return this.teamRepository.standings(id).delete(where);
  }
}
