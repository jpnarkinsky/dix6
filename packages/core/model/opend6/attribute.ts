import { z } from 'zod';

import { DiceCode, DiceCodeRange } from './dicecode';
import { Skill } from './skill';

export const AttributeSchema = z.object({
  name: z.string(),
  abbreviation: z.string(),
  score: DiceCode.schema,
  scoreRange: DiceCodeRange.schema,  
  children: z.array(Skill.schema),
});
