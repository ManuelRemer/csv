const requireModel = async (req, res, next) => {
  const { collection } = req.params;
  const Model = require(`../models/${collection}`);
  req.model = Model;
  next();
};

module.exports = requireModel;
