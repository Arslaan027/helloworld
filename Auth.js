const Person = require("./Models/Person");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ username: username });
      if (!user) {
        done(null, false, { message: "Incorrect username" });
      }
      const isPasswordMatch = user.password === password ? true : false;
      if (isPasswordMatch) {
        done(null, user);
      } else {
        done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
