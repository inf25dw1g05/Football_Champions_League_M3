import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'stats'
    }
  }
})
export class Stats extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    default: 0,
  })
  total_goals?: number;

  @property({
    type: 'number',
    default: 0,
  })
  total_assists?: number;

  @property({
    type: 'number',
    default: 0,
  })
  total_yellow_cards?: number;

  @property({
    type: 'number',
    default: 0,
  })
  total_red_cards?: number;


  constructor(data?: Partial<Stats>) {
    super(data);
  }
}

export interface StatsRelations {
  // describe navigational properties here
}

export type StatsWithRelations = Stats & StatsRelations;
