import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Player} from './player.model';
import {Match} from './match.model';

@model({
  settings: {
    mysql: {
      table: 'match_event'
    }
  }
})export class MatchEvent extends Entity {
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
  event_type: string;

  @property({
    type: 'number',
  })
  minute?: number;

  @belongsTo(() => Player, {name: 'player'})
  player_id: number;

  @belongsTo(() => Match, {name: 'match'})
  match_id: number;

  constructor(data?: Partial<MatchEvent>) {
    super(data);
  }
}

export interface MatchEventRelations {
  // describe navigational properties here
}

export type MatchEventWithRelations = MatchEvent & MatchEventRelations;
