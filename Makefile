install:
	docker-compose run --rm --no-deps app yarn

add:
	docker-compose run --rm app yarn add $(lib)

add-dev:
	docker-compose run --rm app yarn add $(lib) --dev

up:
	docker-compose up -d

up-build:
	docker-compose run --rm --no-deps --p 3000:3000 app yarn start

down:
	docker-compose kill
	docker-compose rm -f

logs:
	docker-compose logs -f

lint:
	docker-compose run --rm --no-deps app yarn lint

test:
	docker-compose run --rm --no-deps app yarn test

test-watch:
	docker-compose run --rm app yarn test:watch

test-coverage:
	docker-compose run --rm --no-deps app yarn coverage

migrate-up:
	docker-compose run --rm --no-deps app yarn migrate

migrate-down:
	docker-compose run --rm --no-deps app yarn migrate:rollback

build:
	docker-compose run --rm --no-deps app yarn build

shell:
	docker-compose run --rm -w ${PWD} app sh
