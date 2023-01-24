const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const authorTransactions = TransactionsFactory.creating('authorTransactions');
const authorValidator = validators.authorValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');
const { errorSender } = require('../utils');

router.get(
  '/author',
  tokenControl,
  authControl,
  authorValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await authorTransactions.selectAsync(req.query);
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.get(
  '/author/:Id',
  tokenControl,
  authControl,
  authorValidator.paramId,
  async (req, res) => {
    try {
      const result = await authorTransactions.findOneAsync(req.params);
      res.json(result || {});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  '/author',
  tokenControl,
  authControl,
  authorValidator.bodyId,
  async (req, res) => {
    try {
      const result = await authorTransactions.deleteAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such author ID in the system !'
        );
      res.json('The author registration was deleted successfully.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.put(
  '/author',
  tokenControl,
  authControl,
  authorValidator.update,
  async (req, res) => {
    try {
      const result = await authorTransactions.updateAsync(req.body, {
        Id: req.body.Id
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such author ID in the system !'
        );
      res.json('author information has been updated');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.post(
  '/author',
  tokenControl,
  authControl,
  authorValidator.insert,
  async (req, res) => {
    try {
      const result = await authorTransactions.insertAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'There was a problem adding the author !'
        );
      res.json('author registered.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

module.exports = router;
