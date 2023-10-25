const bcrypt = require("bcrypt");

const hashString = async (string) => {
  try {
    const hash = await bcrypt.hash(string, 10);
    return hash;
  } catch (error) {
    console.log(error.message);
  }
};

const compareString = async (string, hashedString) => {
  try {
    const match = await bcrypt.compare(string, hashedString);
    return match;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { hashString, compareString };
