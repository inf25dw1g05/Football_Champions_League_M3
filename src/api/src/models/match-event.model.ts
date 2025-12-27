import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Match} from './match.model';
import {Player} from './player.model';

@model()
export class MatchEvent extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  event_id?: number;
  @property({
    type: 'string',
    required: true,
  })
  event_type: string;

  @property({
    type: 'number',
  })
  minute?: number;

  @belongsTo(() => Match, {name: 'match'})
  match_id: number;

  @belongsTo(() => Player, {name: 'player'})
  player_id: number;

  constructor(data?: Partial<MatchEvent>) {
    super(data);
  }
}

export interface MatchEventRelations {
  // describe navigational properties here
}

export type MatchEventWithRelations = MatchEvent & MatchEventRelations;
