const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../midelware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const usersController = require("../controllers/usersController.js");

router
  .route("/signup")
  .get(usersController.signupForm)
  .post(wrapAsync(usersController.signup));

router
  .route("/login")
  .get(usersController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usersController.loginmsg
  );

router.get("/logout", usersController.logout);

// router.post(
//   "/login",
//   passport.Authenticator("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     res.send("welcome");
//   }
// );

module.exports = router;
