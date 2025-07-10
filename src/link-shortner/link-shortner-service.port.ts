export const LINK_SHORTNER_SERVICE_PORT = Symbol('LinkShortnerServicePort');

export interface LinkShortnerServicePort {
  createShortLink(url: string): Promise<string>;
}
