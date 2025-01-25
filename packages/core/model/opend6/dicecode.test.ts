import { describe, expect, it } from '@jest/globals';

import { DiceCode } from '.';

function testCode(diceCode: string, points: number) {
  return () => {
    const dc = new DiceCode(diceCode);
    expect(dc.points).toBe(points);
  };
}

describe('DiceCode', function () {
  const pairs = {
    '2d': 3,
    '3d': 9,
    '4d': 18,
    '2d+1': 5,
  };

  for (const [code, points] of Object.entries(pairs)) {
    it(`Should be able to parse '${code}'`, testCode(code, points));
  }
});
