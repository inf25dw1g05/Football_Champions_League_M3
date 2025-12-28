import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Team, TeamRelations, Player, Standings, Match} from '../models';
import {PlayerRepository} from './player.repository';
import {StandingsRepository} from './standings.repository';
import {MatchRepository} from './match.repository';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {

  public readonly players: HasManyRepositoryFactory<Player, typeof Team.prototype.id>;

  public readonly standings: HasOneRepositoryFactory<Standings, typeof Team.prototype.id>;

  public readonly homeMatches: HasManyRepositoryFactory<Match, typeof Team.prototype.id>;

  public readonly awayMatches: HasManyRepositoryFactory<Match, typeof Team.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>, @repository.getter('StandingsRepository') protected standingsRepositoryGetter: Getter<StandingsRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Team, dataSource);
    this.awayMatches = this.createHasManyRepositoryFactoryFor('awayMatches', matchRepositoryGetter,);
    this.registerInclusionResolver('awayMatches', this.awayMatches.inclusionResolver);
    this.homeMatches = this.createHasManyRepositoryFactoryFor('homeMatches', matchRepositoryGetter,);
    this.registerInclusionResolver('homeMatches', this.homeMatches.inclusionResolver);
    this.standings = this.createHasOneRepositoryFactoryFor('standings', standingsRepositoryGetter);
    this.registerInclusionResolver('standings', this.standings.inclusionResolver);
    this.players = this.createHasManyRepositoryFactoryFor('players', playerRepositoryGetter,);
    this.registerInclusionResolver('players', this.players.inclusionResolver);
  }
}
