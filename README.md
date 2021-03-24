# Command Line

To play the game on the command line: `yarn play`.

To run tests: `yarn test`.
Run specific tests with `yarn test <test name>`.

# Browser

To play the game in a browser: `yarn play:browser`.

Compile SASS:

- `yarn sass:compile`
  Watch SASS:
- `yarn sass:watch`

Run the server:

- `yarn server`
  OR
- cd into /server/
- execute `node index.js`

To run the server with live updating:

- `yarn server:watch`
  OR
- install watchexec if you don't already have it `brew install watchexec`
- run `watchexec --restart --watch index.js -- node index.js`

If you want live updating in the frontend:
`npx live-server`

TODO:

- [x] TS compiler
- [x] tsconfig file
- [ ] ESlint
- [ ] Convert first file (entry point - server/index.js?)
- [ ] Install types for packages
