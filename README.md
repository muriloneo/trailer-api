# Trailer API

This code describes an API to get trailer from [TMDB](https://developers.themoviedb.org/3/movies/get-movie-videos) for over Viaplay input.

## Technology

[Nest](https://github.com/nestjs/nest)

## Prerequisites

- Node.js
- Configure your API from [TMDB] on .env file (copy from .env.example)

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:dev
```

## Test

```bash
$ npm run test
```

## Performance

- It was tested with ab [MACOS] and autocannon.
- The results came up to 480k requests in 30s with avg 16k requests per second, on my local machine.

## Must Have (over next versions)

- Docker / ECS
- 

# To Go Live

- Load balancer with shared cache
- It is a suggestion to have "most searched" already cached, and update it from time to time (Scheduled)
- Study all endpoints to get faster response time
- Try benchmark with different frameworks over the real infraestructure

## Stay in touch

- Author - [Murilo Freire](muriloneo@gmail.com)
