import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Team} from './team.model';
import {MatchEvent} from './match-event.model';
import {Player} from './player.model';

@model({
  settings: {
    mysql: {
      table: 'match'
    }
  }
})
export class Match extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'date',
  })
  match_date?: string;

  @property({
    type: 'string',
  })
  venue?: string;

  @property({
    type: 'number',
    default: 0,
  })
  home_score?: number;

  @property({
    type: 'number',
    default: 0,
  })
  away_score?: number;

  @belongsTo(() => Team, {name: 'homeTeam'})
  home_team_id: number;

  @belongsTo(() => Team, {name: 'awayTeam'})
  away_team_id: number;

  @hasMany(() => MatchEvent, {keyTo: 'match_id'})
  matchEvents: MatchEvent[];

  @hasMany(() => Player, {through: {model: () => MatchEvent, keyFrom: 'match_id', keyTo: 'player_id'}})
  players: Player[];

  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
