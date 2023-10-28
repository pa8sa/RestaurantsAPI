const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function authorization(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User Doesnt Found");
    }

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
        return;
      }

      if (!decoded.email === user.email) {
        return res.status(404).send("You Dont Have Permission To Do This");
      }

      next();
      return;
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { authorization };
