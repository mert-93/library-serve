const Roles = require('../models/roles');

module.exports = {
  user: {
    GET: {
      Authorize: [Roles.Administrator]
    },
    DELETE: {
      Authorize: [Roles.Administrator]
    },
    PUT: {
      Authorize: [Roles.Administrator]
    },
    POST: {
      Authorize: [Roles.Administrator]
    }
  },
  library: {
    GET: {
      Individual_Transactions: [Roles.User],
      Authorize: [Roles.Administrator, Roles.User]
    },
    DELETE: {
      Authorize: [Roles.Administrator, Roles.User],
      Individual_Transactions: [Roles.User]
    },
    PUT: {
      Authorize: [Roles.Administrator, Roles.User],
      Individual_Transactions: [Roles.User]
    },
    POST: {
      Authorize: [Roles.Administrator, Roles.User]
    }
  },
  author: {
    GET: {
      Authorize: [Roles.Administrator, Roles.User]
    },
    DELETE: {
      Authorize: [Roles.Administrator]
    },
    PUT: {
      Authorize: [Roles.Administrator]
    },
    POST: {
      Authorize: [Roles.Administrator]
    }
  },
  book: {
    GET: {
      Authorize: [Roles.Administrator, Roles.User]
    },
    DELETE: {
      Authorize: [Roles.Administrator]
    },
    PUT: {
      Authorize: [Roles.Administrator]
    },
    POST: {
      Authorize: [Roles.Administrator]
    }
  },
  libraries_book: {
    GET: {
      Individual_Transactions: [Roles.User],
      Authorize: [Roles.Administrator, Roles.User]
    },
    DELETE: {
      Authorize: [Roles.Administrator, Roles.User],
      Individual_Transactions: [Roles.User]
    },
    POST: {
      Authorize: [Roles.Administrator, Roles.User]
    }
  }
};
