/**
 * Main application routes
 */

'use strict';

const path = require('path');

module.exports = function (app) {
  // Instructions had two different naming conventions for the api (character for single result and characters for more than one result)
  // many apis tend to have the index and show functions under the same route, so just to cover my bases I made it so both work.
  
  app.use('/character', require('./api/character/character.routes'));
  app.use('/characters', require('./api/character/character.routes'));

  app.use('/planetResidents',require('./api/planetResident/planetResident.routes'));
}
