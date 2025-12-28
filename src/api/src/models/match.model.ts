import {Entity, model, property} from '@loopback/repository';

@model()
export class Match extends Entity {
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
  home_team_id: number;

  @property({
    type: 'number',
    required: true,
  })
  away_team_id: number;

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


  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
