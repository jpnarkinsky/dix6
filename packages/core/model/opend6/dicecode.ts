import { z } from 'zod';

const diceCodeRegex = /^(?<dice>\d+)[dD](\+(?<pips>\d+))?$/;

export class DiceCode {
  static schema = z.string().regex(diceCodeRegex);

  public points = 0;

  constructor(value: string) {
    this.parse(value);
  }

  get dice() {
    return this.parts.dice;
  }

  parse(value: string) {
    const match = value.match(diceCodeRegex);
    if (!match) {
      throw new Error(`Cannot parse dice code: ${value}`);
    }
    const groups = match?.groups;

    const dice = parseInt(groups.dice);
    let pips = parseInt(groups.pips);

    if (Number.isNaN(pips)) {
      pips = 0;
    }

    this.points = dice * pips;
    for (let die = dice; die > 0; die--) {
      this.points = this.points + 3 * (die-1);
    }
  }

  get parts() {
    let dice = 0;
    let points = this.points;

    while(points > dice * 3) {
      dice++;
      points = points - 3*dice;
    }

    return { dice, points };        
  }

  get pips() {
    return this.parts.points;
  }

  toString() {
    if (this.pips == 0) {
      return `${this.dice}D`; 
    }
    return `${this.dice}D+${this.pips}`;
  }

  toJSON(): string {
    return this.toString();
  }
}

export class DiceCodeRange {
  public min: DiceCode;
  public max: DiceCode;

  constructor(dcr: string) {
    this.parse(dcr);
  }

  parse(dcr: string) {
    const values = dcr.split(/[-/]/);
    this.min = values[0];
    this.max = values[1];
  }
}
