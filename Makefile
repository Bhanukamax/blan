all: out/*.js

out/%.js: ./src/%.ts
	npm run build

run: all
	npm run run
