const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class LibrariesBookValidator extends CommonValidator {
  constructor() {
    super();
  }

  static async find(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().min(1).required()
        })
        .validateAsync({ Id: parseInt(req.params.Id) });
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          LibraryId: joi.number().required(),
          BookId: joi.number().required()
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = LibrariesBookValidator;
