import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {Team} from './team.model';
import {Stats} from './stats.model';
import {MatchEvent} from './match-event.model';
import {Match} from './match.model';

@model()
export class Player extends Entity {
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
  position?: string;

  @property({
    type: 'string',
  })
  nationality?: string;
  @property({
    type: 'number',
  })
  shirt_number?: number;

  @belongsTo(() => Team, {name: 'team'})
  team_id: number;

  @hasOne(() => Stats, {keyTo: 'id'})
  stats: Stats;

  @hasMany(() => MatchEvent, {keyTo: 'player_id'})
  matchEvents: MatchEvent[];

  @hasMany(() => Match, {through: {model: () => MatchEvent, keyFrom: 'player_id', keyTo: 'match_id'}})
  matches: Match[];

  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
