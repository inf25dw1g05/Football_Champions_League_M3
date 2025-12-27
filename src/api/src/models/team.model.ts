import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Player} from './player.model';
import {Match} from './match.model';
import {Standings} from './standings.model';

@model()
export class Team extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  team_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
  })
  coach?: string;

  @property({
    type: 'string',
  })
  group_name?: string;

  @hasMany(() => Player, {keyTo: 'team_id'})
  players: Player[];

  @hasMany(() => Match, {keyTo: 'home_team_id'})
  homeMatches: Match[];

  @hasMany(() => Match, {keyTo: 'away_team_id'})
  awayMatches: Match[];

  @belongsTo(() => Match, {name: 'awayTeam'})
  away_team_id: number;

  @hasOne(() => Standings, {keyTo: 'team_id'})
  standings: Standings;

  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
