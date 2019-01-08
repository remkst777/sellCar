const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const UsersModel = require('../models/usersModel');

module.exports = passport => {
  passport.use(
    new LocalStrategy((email, password, done) => {
      const query = { email };

      UsersModel.findOne(query, (err, user) => {
        if (err) throw err;

        if (!user) {
          return done('No user found');
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          }

          return done('Wrong password');
        });
      });
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    UsersModel.findById(id, (err, user) => {
      done(null, user);
    });
  });
};
