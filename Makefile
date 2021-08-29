default: build
	npm run run

build: out/*.js

out/*.js: ./src/*.ts
	npm run build

