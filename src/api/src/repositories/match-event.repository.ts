import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MatchEvent, MatchEventRelations} from '../models';

export class MatchEventRepository extends DefaultCrudRepository<
  MatchEvent,
  typeof MatchEvent.prototype.event_id,
  MatchEventRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MatchEvent, dataSource);
  }
}
