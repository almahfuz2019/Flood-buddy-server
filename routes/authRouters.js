const authRouter = require("express").Router();
const createJwt = require("../controllers/authControlller");

authRouter.post("/jwt", createJwt); // Route for generating the JWT

module.exports = authRouter;
