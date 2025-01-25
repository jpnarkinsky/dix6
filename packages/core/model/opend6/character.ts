import { z } from 'zod';

export const CharacterSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  attributes: z.array(AttributeSchema).min(1),
});
