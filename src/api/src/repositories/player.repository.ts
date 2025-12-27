import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Player, PlayerRelations, Team, MatchEvent, Stats, Match} from '../models';
import {TeamRepository} from './team.repository';
import {MatchEventRepository} from './match-event.repository';
import {StatsRepository} from './stats.repository';
import {MatchRepository} from './match.repository';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.player_id,
  PlayerRelations
> {

  public readonly team: BelongsToAccessor<Team, typeof Player.prototype.player_id>;

  public readonly events: HasManyRepositoryFactory<MatchEvent, typeof Player.prototype.player_id>;

  public readonly stats: HasOneRepositoryFactory<Stats, typeof Player.prototype.player_id>;

  public readonly matchesWithEvents: HasManyThroughRepositoryFactory<Match, typeof Match.prototype.match_id,
          MatchEvent,
          typeof Player.prototype.player_id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('MatchEventRepository') protected matchEventRepositoryGetter: Getter<MatchEventRepository>, @repository.getter('StatsRepository') protected statsRepositoryGetter: Getter<StatsRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Player, dataSource);
    this.matchesWithEvents = this.createHasManyThroughRepositoryFactoryFor('matchesWithEvents', matchRepositoryGetter, matchEventRepositoryGetter,);
    this.registerInclusionResolver('matchesWithEvents', this.matchesWithEvents.inclusionResolver);
    this.stats = this.createHasOneRepositoryFactoryFor('stats', statsRepositoryGetter);
    this.registerInclusionResolver('stats', this.stats.inclusionResolver);
    this.events = this.createHasManyRepositoryFactoryFor('events', matchEventRepositoryGetter,);
    this.registerInclusionResolver('events', this.events.inclusionResolver);
    this.team = this.createBelongsToAccessorFor('team', teamRepositoryGetter,);
    this.registerInclusionResolver('team', this.team.inclusionResolver);
  }
}
