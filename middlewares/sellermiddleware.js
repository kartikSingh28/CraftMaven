// middleware/sellermiddleware.js
const jwt = require("jsonwebtoken");
const { JWT_SELLER_PASSWORD } = require("../config.js");

function sellerMiddleWare(req, res, next) {
  // Accept multiple locations (Authorization header, custom header `token`, or cookie)
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const tokenHeader = req.headers.token; // legacy / alternate
  const cookieToken = req.cookies?.sellerToken; // only if you use cookies and cookie-parser

  let token = null;

  if (authHeader && typeof authHeader === "string") {
    // expecting "Bearer <token>"
    const parts = authHeader.split(" ");
    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) token = parts[1];
    else token = authHeader; // fallback: raw token in Authorization
  } else if (tokenHeader) {
    token = tokenHeader;
  } else if (cookieToken) {
    token = cookieToken;
  }

  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SELLER_PASSWORD);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("sellerMiddleWare jwt verify error:", err.message || err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = { sellerMiddleWare };
