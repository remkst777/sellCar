const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');

const router = express.Router();
const UsersModel = require('../models/usersModel');

const {
  MESSAGES,
  USERS_MODEL_FIELDS,
  SALT_PARAM_1,
  MAIL_SERVICE,
  MAIL_SERVICE_USER,
  MAIL_SERVICE_PASSWORD,
  APP_ADMINS,
  USER_ROLES,
} = require('../constants');

const sendEmail = (req, res, email, message) => {
  const transporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    auth: {
      user: MAIL_SERVICE_USER,
      pass: MAIL_SERVICE_PASSWORD,
    },
  });

  transporter.sendMail({
    from: MAIL_SERVICE,
    to: email,
    subject: message.subject,
    html: message.html,
  });

  return res.status(200).send({ message: message.text });
};

router.post('/registr', (req, res, next) => {
  const newUser = new UsersModel(req.body);

  if (APP_ADMINS.includes(newUser[USERS_MODEL_FIELDS.EMAIL])) {
    newUser[USERS_MODEL_FIELDS.ROLE] = USER_ROLES.ADMIN;
  }

  req.checkBody(USERS_MODEL_FIELDS.EMAIL).notEmpty();
  req.checkBody(USERS_MODEL_FIELDS.EMAIL).isEmail();
  req.checkBody(USERS_MODEL_FIELDS.USERNAME).notEmpty();
  req.checkBody(USERS_MODEL_FIELDS.USERNAME).isLength({ min: 5, max: 20 });
  req.checkBody(USERS_MODEL_FIELDS.PASSWORD).notEmpty();
  req.checkBody(USERS_MODEL_FIELDS.PASSWORD).isLength({ min: 5, max: 20 });

  const validationErrors = req.validationErrors();

  if (validationErrors)
    return res.status(400).send({ message: MESSAGES.FIELD_VALIDATION_FAILED });

  UsersModel.find(
    { [USERS_MODEL_FIELDS.EMAIL]: req.body[USERS_MODEL_FIELDS.EMAIL] },
    (err, data) => {
      if (data[0] && !data[0][USERS_MODEL_FIELDS.ISVERIFIED])
        return res.status(400).send({ message: MESSAGES.ALREADY_REGISTRED });

      if (err || data[0])
        return res.status(400).send({ message: MESSAGES.USER_EXISTS });

      bcrypt.genSalt(SALT_PARAM_1, (err, salt) => {
        bcrypt.hash(newUser[USERS_MODEL_FIELDS.PASSWORD], salt, (err, hash) => {
          newUser[USERS_MODEL_FIELDS.PASSWORD] = hash;
          newUser.save((err, user) => {
            if (err)
              return res.status(500).send({ message: MESSAGES.SERVER_ERROR });

            const host = `${req.headers['x-forwarded-proto']}://${
              req.headers['x-forwarded-host']
            }`;

            const message = {
              text: MESSAGES.LETTER_SENT,
              subject: 'Continue registration',
              html: `<a href="${host}/registr/${
                user.id
              }">Click here to continue registration</a>`,
            };

            return sendEmail(req, res, user[USERS_MODEL_FIELDS.EMAIL], message);
          });
        });
      });
    },
  );
});

router.get('/registr/:token', (req, res) => {
  const { token } = req.params;

  UsersModel.findById(token, (err, user) => {
    if (err || !user)
      return res.status(400).send({ message: MESSAGES.BAD_REQUEST });

    if (user[USERS_MODEL_FIELDS.ISVERIFIED])
      return res.status(400).send({ message: MESSAGES.ALREADY_CONFIRMED });

    user[USERS_MODEL_FIELDS.ISVERIFIED] = true;
    user.save((err, updatedUser) => {
      if (err) return res.status(500).send({ message: MESSAGES.SERVER_ERROR });

      return res.status(200).send({ message: MESSAGES.SUCCESS });
    });
  });
});

router.get('/send-verification-email', (req, res) => {
  const host = `${req.headers['x-forwarded-proto']}://${
    req.headers['x-forwarded-host']
  }`;

  if (!req.user)
    return res.status(401).send({ message: MESSAGES.SEND_EMAIL_FIRST });

  const message = {
    text: MESSAGES.LETTER_SENT,
    subject: 'Continue registration',
    html: `<a href="${host}/registr/${
      req.user.id
    }">Click here to continue registration</a>`,
  };

  return sendEmail(req, res, req.user[USERS_MODEL_FIELDS.EMAIL], message);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(401).send({ message: err });

    req.logIn(user, err => {
      if (err) return res.status(401).send({ message: err });

      if (!user[USERS_MODEL_FIELDS.ISVERIFIED])
        return res.status(401).send({ message: MESSAGES.CONFIRM_EMAIL });

      return res.status(200).send({
        [USERS_MODEL_FIELDS.USERNAME]: user[USERS_MODEL_FIELDS.USERNAME],
        [USERS_MODEL_FIELDS.EMAIL]: user[USERS_MODEL_FIELDS.EMAIL],
        [USERS_MODEL_FIELDS.ROLE]: user[USERS_MODEL_FIELDS.ROLE],
        id: user.id,
      });
    });
  })(req, res, next);
});

router.post('/change-password', (req, res, next) => {
  req.checkBody(USERS_MODEL_FIELDS.EMAIL).notEmpty();
  req.checkBody(USERS_MODEL_FIELDS.EMAIL).isEmail();
  req.checkBody(USERS_MODEL_FIELDS.PASSWORD).notEmpty();
  req.checkBody(`${USERS_MODEL_FIELDS.PASSWORD}2`).notEmpty();
  req
    .checkBody(`${USERS_MODEL_FIELDS.PASSWORD}2`)
    .isLength({ min: 5, max: 20 });

  const validationErrors = req.validationErrors();

  if (validationErrors)
    return res.status(400).send({ message: MESSAGES.FIELD_VALIDATION_FAILED });

  if (!req.user)
    return res.status(401).send({ message: MESSAGES.NOT_AUTHORIZED });

  bcrypt.compare(
    req.body[USERS_MODEL_FIELDS.PASSWORD],
    req.user[USERS_MODEL_FIELDS.PASSWORD],
    (err, isMatch) => {
      if (err) return res.status(500).send({ message: err });

      if (isMatch) {
        return UsersModel.find(
          { [USERS_MODEL_FIELDS.EMAIL]: req.body[USERS_MODEL_FIELDS.EMAIL] },
          (err, data) => {
            if (!data[0])
              return res.status(403).send({ message: MESSAGES.NO_SUCH_USER });

            bcrypt.genSalt(SALT_PARAM_1, (err, salt) => {
              if (err) return res.status(500).send({ message: err });

              bcrypt.hash(
                req.body[`${USERS_MODEL_FIELDS.PASSWORD}2`],
                salt,
                (err, hash) => {
                  if (err) return res.status(500).send({ message: err });

                  data[0][USERS_MODEL_FIELDS.PASSWORD] = hash;
                  data[0].save((err, updatedUser) => {
                    if (err) return res.status(500).send({ message: err });
                    return res.status(200).send({ message: MESSAGES.SUCCESS });
                  });
                },
              );
            });
          },
        );
      }

      return res.status(400).send({ message: MESSAGES.WRONG_PASSWORD });
    },
  );
});

router.post('/recover-password', (req, res) => {
  req.checkBody(USERS_MODEL_FIELDS.EMAIL).notEmpty();
  req.checkBody(USERS_MODEL_FIELDS.EMAIL).isEmail();

  const validationErrors = req.validationErrors();

  if (validationErrors)
    return res.status(400).send({ message: MESSAGES.FIELD_VALIDATION_FAILED });

  UsersModel.find(
    { [USERS_MODEL_FIELDS.EMAIL]: req.body[USERS_MODEL_FIELDS.EMAIL] },
    (err, data) => {
      if (err) return res.status(500).send({ message: err });

      if (!data[0])
        return res.status(403).send({ message: MESSAGES.NO_SUCH_USER });

      const newPassword = `${Math.random()}`.slice(2, 8);

      bcrypt.genSalt(SALT_PARAM_1, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) return res.status(500).send({ message: err });

          data[0].password = hash;
          data[0].save((err, updatedUser) => {
            if (err) return res.status(500).send({ message: err });

            const message = {
              text:
                'Your password is successfully recovered. Check email. New password was sent for you!',
              subject: 'Password recovering',
              html: `New password: <b>${newPassword}</b>`,
            };

            return sendEmail(
              req,
              res,
              req.body[USERS_MODEL_FIELDS.EMAIL],
              message,
            );
          });
        });
      });
    },
  );
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).send({ message: MESSAGES.SUCCESS });
});

router.get('/getuserdata', (req, res) => {
  const user = req.user;

  if (!user) return res.status(401).send({ message: MESSAGES.NOT_AUTHORIZED });

  if (!user[USERS_MODEL_FIELDS.ISVERIFIED])
    return res.status(403).send({ message: MESSAGES.CONFIRM_EMAIL });

  return res.status(200).send({
    [USERS_MODEL_FIELDS.USERNAME]: user[USERS_MODEL_FIELDS.USERNAME],
    [USERS_MODEL_FIELDS.EMAIL]: user[USERS_MODEL_FIELDS.EMAIL],
    [USERS_MODEL_FIELDS.ROLE]: user[USERS_MODEL_FIELDS.ROLE],
    id: user.id,
  });
});

module.exports = router;
