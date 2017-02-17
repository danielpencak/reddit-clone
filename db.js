const env = process.env.NODE_ENV || 'development';
console.log('enviroment ' + env)
const config = require('./knexfile')[env];
console.log('config ', config)
const knex = require('knex')(config)


module.exports = knex;
