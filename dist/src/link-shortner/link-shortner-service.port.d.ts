export declare const LINK_SHORTNER_SERVICE_PORT: unique symbol;
export interface LinkShortnerServicePort {
    createShortLink(url: string): Promise<string>;
}
