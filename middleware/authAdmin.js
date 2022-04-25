const jwt = require("jsonwebtoken");

const config = process.env;

const verifyAdminToken = (req, res, next) => {
  const token = req.query.token || req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .send({ error: "Admin token is required for authentication" });
  } else {
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
      if (decoded.role !== "administrateur") {
        return res.status(401).send({ error: "Invalid Administrateur Token" });
      }
    } catch (err) {
      return res.status(401).send({ error: "Invalid Token" });
    }
  }
  return next();
};

module.exports = verifyAdminToken;
