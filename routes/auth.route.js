const { Router } = require("express");
const { signup, login, dashboard } = require("../controllers/users");

const authRoute = () => {
  const authRoute = "/auth";
  const router = Router();
  router.post(`${authRoute}/login`, login);
  router.post(`${authRoute}/signup`, signup);
  router.post(`${authRoute}/dashboard`, dashboard);
  return router;
};

module.exports = {
  authRoute,
};
