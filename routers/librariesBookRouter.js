const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const librariesBookTransactions = TransactionsFactory.creating(
  'librariesBookTransactions'
);
const librariesBookValidator = validators.librariesBookValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const limitedAuthControl = authorization.limitedAuthControl;
const HttpStatusCode = require('http-status-codes');
const { errorSender } = require('../utils');

router.get(
  '/libraries-book',
  tokenControl,
  authControl,
  limitedAuthControl,
  librariesBookValidator.limitAndOffset,
  async (req, res) => {
    try {
      if (req.Individual_Transactions)
        req.query = { ...req.query, where: { UserId: req.decode.UserId } };
      const result = await librariesBookTransactions.selectViewAsync(req.query);
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  '/libraries-book',
  tokenControl,
  authControl,
  limitedAuthControl,
  librariesBookValidator.bodyId,
  async (req, res) => {
    try {
      if (req.Individual_Transactions) {
        const findOneLibrariesBooks =
          await librariesBookTransactions.findViewAsync({
            ...req.body,
            UserId: req.decode.UserId
          });
        if (!findOneLibrariesBooks)
          return res
            .status(HttpStatusCode.UNAUTHORIZED)
            .json('You can not delete others libraries book!');
      }
      const result = await librariesBookTransactions.deleteAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such libraries book ID in the system !'
        );
      res.json('The libraries book registration was deleted successfully.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.post(
  '/libraries-book',
  tokenControl,
  authControl,
  librariesBookValidator.insert,
  async (req, res) => {
    try {
      const result = await librariesBookTransactions.insertAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'There was a problem adding the libraries book !'
        );
      res.json('libraries book registered.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

module.exports = router;
