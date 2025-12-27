import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Team, TeamRelations, Player, Match, Standings} from '../models';
import {PlayerRepository} from './player.repository';
import {MatchRepository} from './match.repository';
import {StandingsRepository} from './standings.repository';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.team_id,
  TeamRelations
> {

  public readonly players: HasManyRepositoryFactory<Player, typeof Team.prototype.team_id>;

  public readonly homeMatches: HasManyRepositoryFactory<Match, typeof Team.prototype.team_id>;

  public readonly awayMatches: HasManyRepositoryFactory<Match, typeof Team.prototype.team_id>;

  public readonly awayTeam: BelongsToAccessor<Match, typeof Team.prototype.team_id>;

  public readonly standings: HasOneRepositoryFactory<Standings, typeof Team.prototype.team_id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>, @repository.getter('StandingsRepository') protected standingsRepositoryGetter: Getter<StandingsRepository>,
  ) {
    super(Team, dataSource);
    this.standings = this.createHasOneRepositoryFactoryFor('standings', standingsRepositoryGetter);
    this.registerInclusionResolver('standings', this.standings.inclusionResolver);
    this.awayTeam = this.createBelongsToAccessorFor('awayTeam', matchRepositoryGetter,);
    this.registerInclusionResolver('awayTeam', this.awayTeam.inclusionResolver);
    this.awayMatches = this.createHasManyRepositoryFactoryFor('awayMatches', matchRepositoryGetter,);
    this.registerInclusionResolver('awayMatches', this.awayMatches.inclusionResolver);
    this.homeMatches = this.createHasManyRepositoryFactoryFor('homeMatches', matchRepositoryGetter,);
    this.registerInclusionResolver('homeMatches', this.homeMatches.inclusionResolver);
    this.players = this.createHasManyRepositoryFactoryFor('players', playerRepositoryGetter,);
    this.registerInclusionResolver('players', this.players.inclusionResolver);
  }
}
