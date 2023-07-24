# NestJS Authentication API using Passport

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

This is a NestJS framework TypeScript starter repository for building an authentication API with user registration,
authentication, and token refresh functionality using Passport.

## Installation

```bash
$ npm install
```

## Running the App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Features

- User registration: `/auth/sign-up` (public)
- User authentication: `/auth/sign-in` (public)
- Token refresh: `/auth/refresh` (protected with RefreshJwtAuthGuard)
- Get authenticated user's profile: `/me` (protected with JwtAuthGuard)

## Endpoints

- `POST /auth/sign-up`: Create a new user account.
- `POST /auth/sign-in`: Sign in with existing credentials and get an access token.
- `POST /auth/refresh`: Refresh the access token using the refresh token (requires authentication).
- `GET /me`: Get profile data of the currently authenticated user.

## API Documentation

The API documentation is generated automatically using NestJS Swagger. After running the app in development mode,
visit [http://localhost:3000/v1/api](http://localhost:3000/v1/api) to explore the API endpoints.

## Support

This NestJS authentication API is an MIT-licensed open-source project. It can grow thanks to the support of amazing
backers and sponsors. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in Touch

- Author - [Leonardo Dalbosco](https://github.com/LeonardoDB)

## License

Nest is [MIT licensed](LICENSE).
