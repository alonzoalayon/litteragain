var express = require('express');
var router = express.Router();
var LitterController = require('../controllers/LitterController.js');

/*
* GET
*/
router.get('/', function (req, res) {
  LitterController.list(req, res);
});

/*
* GET
*/
router.get('/:id', function (req, res) {
  LitterController.show(req, res);
});

/*
* POST
*/
router.post('/', function (req, res) {
  LitterController.create(req, res);
});

/*
* PUT
*/
router.put('/:id', function (req, res) {
  LitterController.update(req, res);
});

/*
* DELETE
*/
router.delete('/:id', function (req, res) {
  LitterController.remove(req, res);
});

module.exports = router;
