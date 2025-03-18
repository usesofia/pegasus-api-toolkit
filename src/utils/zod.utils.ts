import { z } from 'zod';

export const coercedBoolean = z.preprocess((val) => {
  if (typeof val === 'string') {
    if (['1', 'true'].includes(val.toLowerCase())) return true;
    if (['0', 'false'].includes(val.toLowerCase())) return false;
  }
  return val;
}, z.coerce.boolean());

export const coercedBigInt = z.preprocess((val) => {
  if (typeof val === 'string') {
    return BigInt(val);
  }
  return val;
}, z.coerce.bigint());
