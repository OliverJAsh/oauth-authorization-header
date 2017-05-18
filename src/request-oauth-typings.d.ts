declare module 'request/lib/oauth' {
    import { EventEmitter } from 'events';
    import * as request from 'request';
    import { Url } from 'url';

    type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'UPDATE';

    export type OAuthOptions = request.OAuthOptions & { body_hash?: boolean };

    export type OAuthParams = {} & {
        oauth_version: string,
        oauth_timestamp: string,
        oauth_nonce: string,
        oauth_signature_method: string,
        oauth_signature: string,
        realm?: string,
    };

    export class OAuth {
        // These typings are designed only to provide usability of the methods
        // belows, hence they may only define a subset of the expected types for
        // other methods.
        constructor(request: {
            emit: EventEmitter['emit'],
        })
        buildParams(
            oauthOptions: OAuthOptions,
            parsedUrl: Url,
            method: Method,
            query: string | undefined,
            form: string | undefined,
            querystring: {
                parse(str: string): {};
                stringify(obj: {}): string;
            },
        ): OAuthParams;

        buildBodyHash(
            oauthParams: OAuthParams,
            requestBody: any,
        ): string;

        concatParams(
            oauthParams: OAuthParams,
            sep: string,
            wrap: string,
        ): string;
    }
}

declare module 'public-ip' {
    export const v4: () => Promise<string>;
}
