import {Entity, model, property} from '@loopback/repository';

@model()
export class MatchEvent extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  match_id: number;

  @property({
    type: 'number',
    required: true,
  })
  player_id: number;

  @property({
    type: 'string',
    required: true,
  })
  event_type: string;

  @property({
    type: 'number',
  })
  minute?: number;


  constructor(data?: Partial<MatchEvent>) {
    super(data);
  }
}

export interface MatchEventRelations {
  // describe navigational properties here
}

export type MatchEventWithRelations = MatchEvent & MatchEventRelations;
