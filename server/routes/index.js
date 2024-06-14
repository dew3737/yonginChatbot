const approot = require('app-root-path');
const express = require('express');
const path = require('path');
const router = express.Router();
const apiController = require(approot + '/server/routes/controller/api.controller');

router.post('/dialogue', apiController.dialogue);
router.post('/autocomplete', apiController.autocomplete);
router.post('/quality', apiController.quality);
router.get('/getIp', apiController.getIp);

router.get('/', (req, res, next) => {
  if (req.path.split('/')[1] === 'static') return next();
  res.sendFile(approot + '/build/index.html');
});

module.exports = router;
