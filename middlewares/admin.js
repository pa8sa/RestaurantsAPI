const jwt = require("jsonwebtoken");

async function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(404).send("Wrong Header");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }

    if (decoded.isAdmin) {
      next();
    } else {
      res.status(403).send("Access forbidden. Admin access required.");
    }
  });
}

module.exports = { isAdmin };
