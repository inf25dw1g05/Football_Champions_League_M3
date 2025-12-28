import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MatchEvent, MatchEventRelations, Player, Match} from '../models';
import {PlayerRepository} from './player.repository';
import {MatchRepository} from './match.repository';

export class MatchEventRepository extends DefaultCrudRepository<
  MatchEvent,
  typeof MatchEvent.prototype.id,
  MatchEventRelations
> {

  public readonly player: BelongsToAccessor<Player, typeof MatchEvent.prototype.id>;

  public readonly match: BelongsToAccessor<Match, typeof MatchEvent.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(MatchEvent, dataSource);
    this.match = this.createBelongsToAccessorFor('match', matchRepositoryGetter,);
    this.registerInclusionResolver('match', this.match.inclusionResolver);
    this.player = this.createBelongsToAccessorFor('player', playerRepositoryGetter,);
    this.registerInclusionResolver('player', this.player.inclusionResolver);
  }
}
