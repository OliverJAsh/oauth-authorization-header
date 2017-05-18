# oauth-authorization-header

Generates OAuth `Authorization` header.

Under the hood, this module generates the string using the [battle-tested code](https://github.com/request/request/blob/b12a6245d9acdb1e13c6486d427801e123fdafae/lib/oauth.js#L130) hidden inside the popular [request] library. The request library is concerned about making requests, and thus does not document its standalone OAuth API, nor does it make it very easy to use—hence the existence of this module.

The library is written in TypeScript and is published in JavaScript with type declaration files.

## Installation

```
yarn add oauth-authorization-header
```

## Development

```
yarn
yarn compile
yarn lint
```

[request]: https://github.com/request/request
