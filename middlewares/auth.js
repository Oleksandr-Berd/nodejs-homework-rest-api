const { User } = require("../models/index");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = `${process.env.SECRET_KEY}`;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new Unauthorized("Not authorized");
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = User.findById(id);
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
