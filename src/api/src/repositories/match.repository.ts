import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Match, MatchRelations, Team, MatchEvent, Player} from '../models';
import {TeamRepository} from './team.repository';
import {MatchEventRepository} from './match-event.repository';
import {PlayerRepository} from './player.repository';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.id,
  MatchRelations
> {

  public readonly homeTeam: BelongsToAccessor<Team, typeof Match.prototype.id>;

  public readonly awayTeam: BelongsToAccessor<Team, typeof Match.prototype.id>;

  public readonly matchEvents: HasManyRepositoryFactory<MatchEvent, typeof Match.prototype.id>;

  public readonly players: HasManyThroughRepositoryFactory<Player, typeof Player.prototype.id,
          MatchEvent,
          typeof Match.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('MatchEventRepository') protected matchEventRepositoryGetter: Getter<MatchEventRepository>, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>,
  ) {
    super(Match, dataSource);
    this.players = this.createHasManyThroughRepositoryFactoryFor('players', playerRepositoryGetter, matchEventRepositoryGetter,);
    this.registerInclusionResolver('players', this.players.inclusionResolver);
    this.matchEvents = this.createHasManyRepositoryFactoryFor('matchEvents', matchEventRepositoryGetter,);
    this.registerInclusionResolver('matchEvents', this.matchEvents.inclusionResolver);
    this.awayTeam = this.createBelongsToAccessorFor('awayTeam', teamRepositoryGetter,);
    this.registerInclusionResolver('awayTeam', this.awayTeam.inclusionResolver);
    this.homeTeam = this.createBelongsToAccessorFor('homeTeam', teamRepositoryGetter,);
    this.registerInclusionResolver('homeTeam', this.homeTeam.inclusionResolver);
  }
}
