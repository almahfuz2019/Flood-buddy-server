const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Extract Authorization header
  if (!authHeader) {
    return res.status(403).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the 'Bearer <token>' format

  if (!token) {
    return res.status(403).json({ message: "Token missing" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = decoded; // Attach decoded user info (e.g., email, role) to request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
