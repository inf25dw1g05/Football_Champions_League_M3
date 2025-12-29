import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Player} from './player.model';
import {Standings} from './standings.model';
import {Match} from './match.model';

@model({
  settings: {
    mysql: {
      table: 'team'
    }
  }
})
export class Team extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

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

  @hasOne(() => Standings, {keyTo: 'id'})
  standings: Standings;

  @hasMany(() => Match, {keyTo: 'home_team_id'})
  homeMatches: Match[];

  @hasMany(() => Match, {keyTo: 'away_team_id'})
  awayMatches: Match[];

  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
