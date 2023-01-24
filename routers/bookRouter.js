const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const bookTransactions = TransactionsFactory.creating('bookTransactions');
const bookValidator = validators.bookValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');
const { errorSender } = require('../utils');

router.get(
  '/book',
  tokenControl,
  authControl,
  bookValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await bookTransactions.selectViewAsync(req.query);
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.get(
  '/book/:Id',
  tokenControl,
  authControl,
  bookValidator.paramId,
  async (req, res) => {
    try {
      const result = await bookTransactions.findViewAsync(req.params);
      res.json(result || {});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  '/book',
  tokenControl,
  authControl,
  bookValidator.bodyId,
  async (req, res) => {
    try {
      const result = await bookTransactions.deleteAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such book ID in the system !'
        );
      res.json('The book registration was deleted successfully.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.put(
  '/book',
  tokenControl,
  authControl,
  bookValidator.update,
  async (req, res) => {
    try {
      const result = await bookTransactions.updateAsync(req.body, {
        Id: req.body.Id
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such book ID in the system !'
        );
      res.json('book information has been updated');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.post(
  '/book',
  tokenControl,
  authControl,
  bookValidator.insert,
  async (req, res) => {
    try {
      const result = await bookTransactions.insertAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'There was a problem adding the book !'
        );
      res.json('book registered.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

module.exports = router;
