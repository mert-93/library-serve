const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const libraryTransactions = TransactionsFactory.creating('libraryTransactions');
const libraryValidator = validators.libraryValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');
const { errorSender } = require('../utils');

router.get(
  '/library',
  tokenControl,
  authControl,
  libraryValidator.limitAndOffset,
  async (req, res) => {
    try {
      if (req.Individual_Transactions)
        req.query = { ...req.query, UserId: req.decode.UserId };
      const result = await libraryTransactions.selectViewAsync(req.query);
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.get(
  '/library/:Id',
  tokenControl,
  authControl,
  libraryValidator.paramId,
  async (req, res) => {
    try {
      if (req.Individual_Transactions)
        req.params = { ...req.params, UserId: req.decode.UserId };
      const result = await libraryTransactions.findViewAsync(req.params);
      res.json(result || {});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  '/library',
  tokenControl,
  authControl,
  libraryValidator.bodyId,
  async (req, res) => {
    try {
      if (req.Individual_Transactions)
        req.body = { ...req.body, UserId: req.decode.UserId };
      const result = await libraryTransactions.deleteAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such library ID in the system !'
        );
      res.json('The library registration was deleted successfully.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.put(
  '/library',
  tokenControl,
  authControl,
  libraryValidator.update,
  async (req, res) => {
    try {
      if (req.Individual_Transactions)
        req.body = { ...req.body, UserId: req.decode.UserId };
      const result = await libraryTransactions.updateAsync(req.body, {
        Id: req.body.Id
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such library ID in the system !'
        );
      res.json('library information has been updated');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.post(
  '/library',
  tokenControl,
  authControl,
  libraryValidator.insert,
  async (req, res) => {
    try {
      const result = await libraryTransactions.insertAsync({
        ...req.body,
        UserId: req.decode.UserId
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'There was a problem adding the library !'
        );
      res.json('library registered.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

module.exports = router;
