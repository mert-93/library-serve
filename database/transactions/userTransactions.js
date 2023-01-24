const {
  FadabHelper,
  selectAsync,
  findOneAsync
} = require('fadab-mysql-helper');

class UserTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tblUser';
  }

  selectViewAsync(selectOptions = null) {
    return selectAsync('vwUserList', selectOptions);
  }

  findViewAsync(where) {
    return findOneAsync('vwUserList', where);
  }
}

module.exports = UserTransactions;
