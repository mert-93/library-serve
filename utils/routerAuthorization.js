const Roles = require('../models/roles');

module.exports = {
  user: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator]
    }
  },
  library: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator],
      Individual_Transactions: [Roles.User]
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator],
      Individual_Transactions: [Roles.User]
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator],
      Individual_Transactions: [Roles.User]
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator]
    }
  },
  author: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator]
    }
  },
  book: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator]
    }
  }
};
