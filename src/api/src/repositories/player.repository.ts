import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Player, PlayerRelations, Team, Stats, MatchEvent, Match} from '../models';
import {TeamRepository} from './team.repository';
import {StatsRepository} from './stats.repository';
import {MatchEventRepository} from './match-event.repository';
import {MatchRepository} from './match.repository';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {

  public readonly team: BelongsToAccessor<Team, typeof Player.prototype.id>;

  public readonly stats: HasOneRepositoryFactory<Stats, typeof Player.prototype.id>;

  public readonly matchEvents: HasManyRepositoryFactory<MatchEvent, typeof Player.prototype.id>;

  public readonly matches: HasManyThroughRepositoryFactory<Match, typeof Match.prototype.id,
          MatchEvent,
          typeof Player.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('StatsRepository') protected statsRepositoryGetter: Getter<StatsRepository>, @repository.getter('MatchEventRepository') protected matchEventRepositoryGetter: Getter<MatchEventRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Player, dataSource);
    this.matches = this.createHasManyThroughRepositoryFactoryFor('matches', matchRepositoryGetter, matchEventRepositoryGetter,);
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
    this.matchEvents = this.createHasManyRepositoryFactoryFor('matchEvents', matchEventRepositoryGetter,);
    this.registerInclusionResolver('matchEvents', this.matchEvents.inclusionResolver);
    this.stats = this.createHasOneRepositoryFactoryFor('stats', statsRepositoryGetter);
    this.registerInclusionResolver('stats', this.stats.inclusionResolver);
    this.team = this.createBelongsToAccessorFor('team', teamRepositoryGetter,);
    this.registerInclusionResolver('team', this.team.inclusionResolver);
  }
}
