const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/config");

async function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(404).send("Wrong Header");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }

    if (decoded.isAdmin) {
      next();
      return;
    } else {
      res.status(403).send("Access forbidden. Admin access required.");
    }
  });
}

module.exports = { isAdmin };
