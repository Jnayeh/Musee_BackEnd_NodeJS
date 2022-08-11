const bunyan = require("bunyan");

const loggers = {
  developement: () =>
    bunyan.createLogger({ name: "developement", level: "debug" }),
  production: () => bunyan.createLogger({ name: "production", level: "info" }),
  test: () => bunyan.createLogger({ name: "test", level: "fatal" }),
};

module.exports = {
  developement: {
    log: loggers.developement,
  },
  production: {
    log: loggers.production,
  },
  test: {
    log: loggers.test,
  },
};
