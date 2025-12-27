import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MatchEvent, MatchEventRelations, Match, Player} from '../models';
import {MatchRepository} from './match.repository';
import {PlayerRepository} from './player.repository';

export class MatchEventRepository extends DefaultCrudRepository<
  MatchEvent,
  typeof MatchEvent.prototype.event_id,
  MatchEventRelations
> {

  public readonly match: BelongsToAccessor<Match, typeof MatchEvent.prototype.event_id>;

  public readonly player: BelongsToAccessor<Player, typeof MatchEvent.prototype.event_id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>,
  ) {
    super(MatchEvent, dataSource);
    this.player = this.createBelongsToAccessorFor('player', playerRepositoryGetter,);
    this.registerInclusionResolver('player', this.player.inclusionResolver);
    this.match = this.createBelongsToAccessorFor('match', matchRepositoryGetter,);
    this.registerInclusionResolver('match', this.match.inclusionResolver);
  }
}
