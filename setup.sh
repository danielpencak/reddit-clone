dropdb reddit-clone --if-exists
dropdb reddit-clone-test --if-exists

createdb reddit-clone
createdb reddit-clone-test

npm run knex migrate:latest
# knex migrate:latest --env test --knexfile app/knexfile.js

npm run knex seed:run
