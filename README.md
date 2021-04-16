# Play

From the command line, run the server:

- `yarn server`
  OR
- `yarn server:watch`

Then in a separate tab:

- `yarn play`

Everything is compiled and bundled by Parcel and hosted on port 1234

- open http://localhost:1234

# Testing

To run tests: `yarn test`.
Run specific tests with `yarn test <test name>`.

# Other

Compile SASS:

- `yarn sass:compile`
  Watch SASS:
- `yarn sass:watch`

TODO:

- [x] TS compiler
- [x] tsconfig file
- [ ] ESlint
- [x] Convert first file (entry point - server/index.js?)
- [x] Install types for packages
- [x] Remove the older versions of node from github workflow

- [ ] Add types for Classes (replace Any types)
- [ ] JSON Schema
- [ ] Make choice an enumerable
