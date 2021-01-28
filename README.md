# Command Line

To run, from /src/ execute `node main.js`.

To test, from /lib/ execute `yarn test`.
Run specific tests with `yarn test <test name>`.

# Browser

Compile SASS:

- `yarn sass-compile`
  Watch SASS:
- `yarn sass-watch`

Run the server:

- cd into /server/
- execute `node index.js`

To run the server with live updating:

- install watchexec if you don't already have it `brew install watchexec`
- run `watchexec --restart --watch index.js -- node index.js`

Run the frontend:
`npx live-server`
