'use strict';

const { Router } = require('express');
const controller = require('./character.controller');

var router = new Router();
// I'm using one file to set the params across all the routers, but typically I'd create a separate one for each api resource
require('../../params')(router);

router.get("/", controller.index);
router.get("/:character", controller.show);

module.exports = router;
