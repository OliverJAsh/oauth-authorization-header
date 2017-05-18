# oauth-authorization-header

Generates OAuth `Authorization` header.

Under the hood, this module generates the string using the [battle-tested code](https://github.com/request/request/blob/b12a6245d9acdb1e13c6486d427801e123fdafae/lib/oauth.js#L130) hidden inside the popular [request] library. The request library is concerned about making requests, and thus does not document its standalone OAuth API, nor does it make it very easy to use—hence the existence of this module.

The library is written in TypeScript and is published in JavaScript with type declaration files.

## Installation

```
yarn add oauth-authorization-header
```

## Example

Twitter:

``` ts
import fetch from 'node-fetch';
import * as querystring from 'querystring';
import { getOAuthAuthorizationHeader, OAuthOptions } from '../src';

const CONSUMER_KEY = 'YOUR_CONSUMER_KEY';
const CONSUMER_SECRET = 'YOUR_CONSUMER_SECRET';
const CALLBACK = 'YOUR_CALLBACK';

const hostUrl = 'https://api.twitter.com';

const fetchFromTwitter = ({
    oAuth,
    baseUrlPath,
    method,
    queryParams,
}: {
    oAuth: OAuthOptions,
    baseUrlPath: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'UPDATE',
    queryParams: {},
}) => {
    const baseUrl = `${hostUrl}${baseUrlPath}`;
    const paramsStr = Object.keys(queryParams).length > 0
        ? `?${querystring.stringify(queryParams)}`
        : '';
    const url = `${baseUrl}${paramsStr}`;

    const authorizationHeader = getOAuthAuthorizationHeader({
        oAuth,
        url,
        method,
        queryParams,
        formParams: {},
    });

    const headers = { 'Authorization': authorizationHeader };
    return fetch(url, {
        method,
        headers,
    });
};

const getRequestToken = () => (
    fetchFromTwitter({
        oAuth: {
            consumerKey: CONSUMER_KEY,
            consumerSecret: CONSUMER_SECRET,
            callback: CALLBACK,
        },
        baseUrlPath: `/oauth/request_token`,
        method: 'POST',
        queryParams: {},
    })
);

getRequestToken().then(response => {
    // …
});
```

## Development

```
yarn
yarn compile
yarn lint
```

[request]: https://github.com/request/request
