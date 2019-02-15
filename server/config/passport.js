const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const UsersModel = require('../models/usersModel');

const { MESSAGES, USERS_MODEL_FIELDS } = require('../constants');

module.exports = passport => {
  passport.use(
    new LocalStrategy((email, password, done) => {
      const query = { [USERS_MODEL_FIELDS.EMAIL]: email };

      UsersModel.findOne(query, (err, user) => {
        if (err) throw err;

        if (!user) {
          return done(MESSAGES.NO_SUCH_USER);
        }

        bcrypt.compare(password, user[USERS_MODEL_FIELDS.PASSWORD], (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          }

          return done(MESSAGES.WRONG_PASSWORD);
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
