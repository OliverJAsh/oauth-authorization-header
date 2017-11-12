import * as qsLib from 'qs';
import * as urlLib from 'url';
import { OAuth, OAuthOptions as RequestOAuthOptions } from 'request/lib/oauth';

const oauth = new OAuth({
    emit: (eventType, ...args) => {
        if (eventType === 'error') {
            throw new Error(`request library emitted an error event with args: ${args}`);
        }
        return true;
    },
});

export type OAuthOptions = {
    consumerKey: string,
    consumerSecret: string,
    callback?: string,
    token?: string,
    tokenSecret?: string,
    verifier?: string,
};

type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'UPDATE';

export const getOAuthAuthorizationHeader = ({
    oAuth,
    url,
    method,
    queryParams,
    formParams,
}: {
    oAuth: OAuthOptions,
    url: string,
    method: Method,
    queryParams: {},
    formParams: {},
}) => {
    const oauthOptions: RequestOAuthOptions = {
        callback: oAuth.callback,
        consumer_key: oAuth.consumerKey,
        consumer_secret: oAuth.consumerSecret,
        ...(
            oAuth.token !== undefined
                ? { token: oAuth.token }
                : {}
        ),
        ...(
            oAuth.tokenSecret !== undefined
                ? { token_secret: oAuth.tokenSecret }
                : {}
        ),
        ...(
            oAuth.verifier !== undefined
                ? { verifier: oAuth.verifier }
                : {}
        ),

    };

    const parsedUrl = urlLib.parse(url);
    const formParamsStr = qsLib.stringify(formParams);
    const queryParamsStr = qsLib.stringify(queryParams);

    const oauthParams = oauth.buildParams(
        oauthOptions,
        parsedUrl,
        method,
        queryParamsStr,
        formParamsStr,
        qsLib,
    );
    const oauthParamsWithBodyHash = {
        ...oauthParams,
        ...(
            oauthOptions.body_hash !== undefined && oauthOptions.body_hash
                ? { body_hash: oauth.buildBodyHash(oauthParams, ''), }
                : {}
        ),
    };
    const authScheme = 'OAuth';
    const headerParamsStr = oauth.concatParams(oauthParamsWithBodyHash, ',', '"');
    const authorizationHeader = `${authScheme} ${headerParamsStr}`;

    return authorizationHeader;
};
