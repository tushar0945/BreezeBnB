const User = require("../models/user");

module.exports.signupForm = (req, res) => {
  res.locals.showLogin = true;
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.logIn(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcom to Breezbnb!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.locals.showSignup = true;
  res.render("users/login.ejs");
};

module.exports.loginmsg = async (req, res) => {
  req.flash("success", "Welcome back to BreezeBnB!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully...!");
    res.redirect("/listings");
  });
};
