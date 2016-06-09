var LitterModel = require('../models/LitterModel.js');

/**
* TaskController.js
*
* @description :: Server-side logic for managing tasks.
*/
module.exports = {

  /**
  * TaskController.list()
  */
  list: function (req, res) {
    LitterModel.find(function (err, basura) {
      return res.json(basura);
    });
  },

  /**
  * TaskController.show()
  */
  show: function (req, res) {
    var id = req.params.id;
    LitterModel.findOne({_id: id}, function (err, basura) {
      return res.json(basura);
    });
  },

  /**
  * TaskController.create()
  */
  create: function (req, res) {
    var basura = new LitterModel({
            basura : req.body.text
    });

    basura.save(function (err, basura) {
      //return res.json(basura);
      res.redirect('/');
    });
  },

  /**
  * TaskController.update()
  */
  update: function (req, res) {
    var id = req.params.id;
    LitterModel.findOne({_id: id}, function (err, basura) {
      basura.text = req.body.text ? req.body.text : basura.text;
      basura.save(function (err, basura) {
        return res.json(basura);
      });
    });
  },

  /**
  * TaskController.remove()
  */
  remove: function (req, res) {
    var id = req.params.id;
    LitterModel.findByIdAndRemove(id, function (err, basura) {
      return res.json(basura);
    });
  }
};
