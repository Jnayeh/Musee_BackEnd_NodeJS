// CONFIG
const config = require("../config")[process.env.NODE_ENV || "developement"];

//Logging
const log = config.log();
const jwt = require("jsonwebtoken");
// CREATE TOKEN
const createToken = (_user) => {
  //Logging user for future possible problems XD
  log.info("user", _user);
  let token = jwt.sign(
    {
      id: _user._id,
      role: _user.role,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "48h",
    }
  );
  return token;
};
module.exports = createToken;
