import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Standings, StandingsRelations} from '../models';

export class StandingsRepository extends DefaultCrudRepository<
  Standings,
  typeof Standings.prototype.team_id,
  StandingsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Standings, dataSource);
  }
}
