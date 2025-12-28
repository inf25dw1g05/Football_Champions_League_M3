import {Entity, model, property} from '@loopback/repository';

@model()
export class Standings extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  group_name?: string;

  @property({
    type: 'string',
    required: true,
  })
  team_name: string;

  @property({
    type: 'number',
    default: 0,
  })
  points?: number;

  @property({
    type: 'number',
    default: 0,
  })
  goal_diff?: number;

  @property({
    type: 'number',
    default: 0,
  })
  goals_for?: number;

  @property({
    type: 'number',
    default: 0,
  })
  goals_against?: number;

  @property({
    type: 'number',
    default: 0,
  })
  played?: number;

  @property({
    type: 'number',
    default: 0,
  })
  win?: number;

  @property({
    type: 'number',
    default: 0,
  })
  draw?: number;

  @property({
    type: 'number',
    default: 0,
  })
  loss?: number;


  constructor(data?: Partial<Standings>) {
    super(data);
  }
}

export interface StandingsRelations {
  // describe navigational properties here
}

export type StandingsWithRelations = Standings & StandingsRelations;
