const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class AuthorValidator extends CommonValidator {
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

  static async update(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().required(),
          BookName: joi
            .string()
            .max(100)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')),
          BookPageCount: joi.number(),
          BookType: joi
            .string()
            .max(256)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')),
          AuthorId: joi.number().required()
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          BookName: joi
            .string()
            .max(100)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')),
          BookPageCount: joi.number(),
          BookType: joi
            .string()
            .max(256)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')),
          AuthorId: joi.number().required()
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = AuthorValidator;
