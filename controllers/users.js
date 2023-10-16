const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signup = async (req, res) => {
  try {
    const user = req.body;

    await User.create(user);
    const token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.status(400).send("SomeThing Doest Work");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email And Password Are Required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    const token = jwt.sign({ email: user.email, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    return res.status(404).send("SomeThing Doest Work");
  }
};

const dashboard = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(404).send("Wrong Header");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).send(decoded);
  } catch (error) {
    console.log(error);
    return res.status(404).send("SomeThing Doest Work");
  }
};

module.exports = {
  signup,
  login,
  dashboard,
};
