import { z } from 'zod';

import { DiceCode } from './dicecode';

export class Skill {
  static schema = z.object({
    name: z.string(),
    score: DiceCode.schema,
    isAdvanced: z.boolean().default(false),
    isSpecialization: z.boolean().default(false),
    children: z.array(z.object()),
  });
}
