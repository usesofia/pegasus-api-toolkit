import { z } from 'zod';

export const CHANNEL_TYPES = {
  WEB_APP: 'WEB_APP',
  WHATSAPP: 'WHATSAPP',
  SYSTEM: 'SYSTEM',
} as const;

export type ChannelType = keyof typeof CHANNEL_TYPES;

export const channel = z
  .nativeEnum(CHANNEL_TYPES)
  .describe('Canal de origem da operação');
