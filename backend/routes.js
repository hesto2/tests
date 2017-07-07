/**
 * Main application routes
 */

'use strict';

const path = require('path');
const request = require("request");
module.exports = function (app) {
  // Instructions had two different naming conventions for the api (character for single result and characters for more than one result)
  // many apis tend to have the index and show functions under the same route, so just to cover my bases I made it so both work.

  app.use('/character', require('./api/character/character.routes'));
  app.use('/characters', require('./api/character/character.routes'));

  app.use('/planetResidents', require('./api/planetResident/planetResident.routes'));









  /*** This is code added to support the frontend test, this is irrelevant for the requirements listed in the backend test (I threw them under the same server so deploying my demo would be easier/cheaper)***/
  app.get('/representatives/:state',
    findRepresentativesByState,
    jsonResponse
  );

  app.get('/senators/:state',
    findSenatorsByState,
    jsonResponse
  );

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
  });

  function findRepresentativesByState(req, res, next) {
    const url = `http://whoismyrepresentative.com/getall_reps_bystate.php?state=${req.params.state}&output=json`;
    request(url, handleApiResponse(res, next));
  }

  function findSenatorsByState(req, res, next) {
    const url = `http://whoismyrepresentative.com/getall_sens_bystate.php?state=${req.params.state}&output=json`;
    request(url, handleApiResponse(res, next));
  }

  function handleApiResponse(res, next) {
    return (err, response, body) => {
      if (err || body[0] === '<') {
        res.locals = {
          success: false,
          error: err || 'Invalid request. Please check your state variable.'
        };
        return next();
      }
      res.locals = {
        success: true,
        results: JSON.parse(body).results
      };
      return next();
    };
  }

  function jsonResponse(req, res, next) {
    return res.json(res.locals);
  }
}
