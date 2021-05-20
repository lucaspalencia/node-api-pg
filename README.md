# Node API with PostgreSQL

To do list application example using [Node.js API starter](https://github.com/lucaspalencia/node-api-starter) with PostgreSQL

- [knex](https://github.com/knex/knex#readme) + [pg](https://github.com/brianc/node-postgres) for query builder
- [objection](https://github.com/vincit/objection.js#readme) for ORM

## Requirements

To run this project you need to have installed:

- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [gnu make](https://www.gnu.org/software/make/)

## Setup

### Prepare your development environment

Create a copy `.env` file from `.env.example` and populate the variables.

Install dependencies:

```bash
make install
```

Run migrations:

```bash
make migrate-up
```

Start application:

```bash
make up
```

View logs:

```bash
make logs
```

This command will boot:
- Node API on [http://localhost:3000](http://localhost:3000) if `PORT` variable has not been set on .env file. If variable has been set, will boot API on `http://localhost:${PORT}`
- PostgreSQL database using PORT 5432 with environments variables defined on `docker-compose.yml`. To change database name, just change it in both `docker-compose.yml` and `.env` files

## Users module

Folder: ```/src/users```

### Create user

POST to `/users` endpoint with request body such as:
```json
{
  "name": "User name",
  "email": "user_email@email.com"
}
```

### List users

GET to `/users` endpoint will return all users on database

## Migrations

For new migrations, just add them on `migrations` folder with file name as `time_action_entity_type`. For example: `20210517211000_create_users_table.ts`

Run migrations:
```bash
make migrate-up
```

Rollback migrations
```bash
make migrate-down
```

## Commands

```bash
make install                  - install dependencies
make add lib=PACKAGE_NAME     - add dependency
make add-dev lib=PACKAGE_NAME - add dev dependency
make up                       - start app
make logs                     - view logs
make down                     - kill app
make lint                     - run lint
make test                     - run tests
make test-watch               - run tests on watch mode
make test-coverage            - run tests with coverage report on /coverage folder
make build                    - build app on /dist folder
make up-build                 - start built app
make migrate-up               - run migrations
make migrate-down             - rollback the last batch of migrations
make shell                    - run app shell
```

## Coding

- [Install .editorconfig plugin on your editor](http://editorconfig.org/#download)
- [Install eslint lint plugin on your editor](https://eslint.org/docs/user-guide/integrations)
