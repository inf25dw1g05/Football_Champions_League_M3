import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Match, MatchRelations, Team, MatchEvent, Player} from '../models';
import {TeamRepository} from './team.repository';
import {MatchEventRepository} from './match-event.repository';
import {PlayerRepository} from './player.repository';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.match_id,
  MatchRelations
> {

  public readonly homeTeam: BelongsToAccessor<Team, typeof Match.prototype.match_id>;

  public readonly events: HasManyRepositoryFactory<MatchEvent, typeof Match.prototype.match_id>;

  public readonly playersWithEvents: HasManyThroughRepositoryFactory<Player, typeof Player.prototype.player_id,
          MatchEvent,
          typeof Match.prototype.match_id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('MatchEventRepository') protected matchEventRepositoryGetter: Getter<MatchEventRepository>, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>,
  ) {
    super(Match, dataSource);
    this.playersWithEvents = this.createHasManyThroughRepositoryFactoryFor('playersWithEvents', playerRepositoryGetter, matchEventRepositoryGetter,);
    this.registerInclusionResolver('playersWithEvents', this.playersWithEvents.inclusionResolver);
    this.events = this.createHasManyRepositoryFactoryFor('events', matchEventRepositoryGetter,);
    this.registerInclusionResolver('events', this.events.inclusionResolver);
    this.homeTeam = this.createBelongsToAccessorFor('homeTeam', teamRepositoryGetter,);
    this.registerInclusionResolver('homeTeam', this.homeTeam.inclusionResolver);
  }
}
