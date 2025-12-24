import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Stats, StatsRelations} from '../models';

export class StatsRepository extends DefaultCrudRepository<
  Stats,
  typeof Stats.prototype.player_id,
  StatsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Stats, dataSource);
  }
}
