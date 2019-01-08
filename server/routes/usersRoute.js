const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');

const router = express.Router();
const UsersModel = require('../models/usersModel');

const SALT_PARAM_1 = 10;

const sendEmail = (req, res, email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'romanrem888@gmail.com',
      pass: 'r123123r',
    },
  });

  transporter.sendMail({
    from: 'Mail service',
    to: email,
    subject: message.subject,
    html: message.html,
  });

  return res.status(200).send({ message: message.text });
};

router.post('/registr', (req, res, next) => {
  const newUser = new UsersModel(req.body);

  req.checkBody('email').notEmpty();
  req.checkBody('email').isEmail();
  req.checkBody('username').notEmpty();
  req.checkBody('username').isLength({ min: 5, max: 20 });
  req.checkBody('password').notEmpty();
  req.checkBody('password').isLength({ min: 5, max: 20 });

  const validationErrors = req.validationErrors();

  if (validationErrors)
    return res.status(400).send({ message: 'Field validation is failed' });

  UsersModel.find({ email: req.body.email }, (err, data) => {
    if (data[0] && !data[0].isVerified)
      return res
        .status(400)
        .send({ message: 'You were registred early. Confirm email.' });

    if (err || data[0])
      return res.status(400).send({ message: 'Such user already exists' });

    bcrypt.genSalt(SALT_PARAM_1, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save((err, user) => {
          if (err) return res.status(500).send({ message: 'Server error' });

          const host = `${req.headers['x-forwarded-proto']}://${
            req.headers['x-forwarded-host']
          }`;

          const message = {
            text: 'Letter has been sent. You should confirm your email.',
            subject: 'Continue registration',
            html: `<a href="${host}/registr/${
              user.id
            }">Click here to continue registration</a>`,
          };

          return sendEmail(req, res, user.email, message);
        });
      });
    });
  });
});

router.get('/registr/:token', (req, res) => {
  const { token } = req.params;

  UsersModel.findById(token, (err, user) => {
    if (err || !user) return res.status(400).send({ message: 'Bad request' });

    if (user.isVerified)
      return res
        .status(400)
        .send({ message: 'You have already confirmed your email' });

    user.isVerified = true;
    user.save((err, updatedUser) => {
      if (err) return res.status(500).send({ message: 'Server error' });

      return res.status(200).send({ message: 'Success' });
    });
  });
});

router.get('/send-verification-email', (req, res) => {
  const host = `${req.headers['x-forwarded-proto']}://${
    req.headers['x-forwarded-host']
  }`;

  if (!req.user)
    return res
      .status(401)
      .send({ message: 'You should send your email first' });

  const message = {
    text: 'Letter has been sent. You should confirm your email.',
    subject: 'Continue registration',
    html: `<a href="${host}/registr/${
      req.user.id
    }">Click here to continue registration</a>`,
  };

  return sendEmail(req, res, req.user.email, message);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(401).send({ message: err });

    req.logIn(user, err => {
      if (err) return res.status(401).send({ message: err });

      if (!user.isVerified)
        return res
          .status(401)
          .send({ message: 'You need to confirm your email' });

      return res.status(200).send({
        username: user.username,
        email: user.email,
        id: user.id,
      });
    });
  })(req, res, next);
});

router.post('/change-password', (req, res, next) => {
  req.checkBody('email').notEmpty();
  req.checkBody('email').isEmail();
  req.checkBody('password').notEmpty();
  req.checkBody('password2').notEmpty();
  req.checkBody('password2').isLength({ min: 5, max: 20 });

  const validationErrors = req.validationErrors();

  if (validationErrors)
    return res.status(400).send({ message: 'Field validation is failed' });

  if (!req.user) return res.status(401).send({ message: 'Not authorized' });

  bcrypt.compare(req.body.password, req.user.password, (err, isMatch) => {
    if (err) return res.status(500).send({ message: err });

    if (isMatch) {
      return UsersModel.find({ email: req.body.email }, (err, data) => {
        if (!data[0]) return res.status(403).send({ message: 'No such user' });

        bcrypt.genSalt(SALT_PARAM_1, (err, salt) => {
          if (err) return res.status(500).send({ message: err });

          bcrypt.hash(req.body.password2, salt, (err, hash) => {
            if (err) return res.status(500).send({ message: err });

            data[0].password = hash;
            data[0].save((err, updatedUser) => {
              if (err) return res.status(500).send({ message: err });
              return res.status(200).send({ message: 'Success' });
            });
          });
        });
      });
    }

    return res.status(400).send({ message: 'Wrong password' });
  });
});

router.post('/recover-password', (req, res) => {
  req.checkBody('email').notEmpty();
  req.checkBody('email').isEmail();

  const validationErrors = req.validationErrors();

  if (validationErrors)
    return res.status(400).send({ message: 'Field validation is failed' });

  UsersModel.find({ email: req.body.email }, (err, data) => {
    if (err) return res.status(500).send({ message: err });

    if (!data[0]) return res.status(403).send({ message: 'No such user' });

    const newPassword = Math.random()
      .toString()
      .slice(2, 8);

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

          return sendEmail(req, res, req.body.email, message);
        });
      });
    });
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).send({ message: 'Success' });
});

router.get('/getuserdata', (req, res) => {
  const user = req.user;

  if (!user) return res.status(401).send({ message: 'Not authorized' });

  if (!user.isVerified)
    return res.status(403).send({ message: 'You should confirm your email' });

  return res.status(200).send({
    username: user.username,
    email: user.email,
    id: user.id,
  });
});

module.exports = router;
