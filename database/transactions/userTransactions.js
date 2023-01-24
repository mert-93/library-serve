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

  async selectViewAsync(selectOptions = null) {
    return selectAsync('vwUserList', selectOptions);
  }

  async findViewAsync(where) {
    return findOneAsync('vwUserList', where);
  }
}

module.exports = UserTransactions;
