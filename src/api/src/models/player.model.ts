import {Entity, model, property} from '@loopback/repository';

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
    required: true,
  })
  team_id: number;

  @property({
    type: 'number',
  })
  shirt_number?: number;


  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
