const jwt = require("jsonwebtoken");
const { JWT_BUYER_PASSWORD } = require("../config");

async function buyerMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization Denied: No Token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_BUYER_PASSWORD);

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    console.log("buyerMiddleware jwt verify error:", err.message);
    return res.status(401).json({ message: "You need to Sign Up first" });
  }
}

module.exports = { buyerMiddleware };
