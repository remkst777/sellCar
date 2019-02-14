const express = require('express');

const router = express.Router();
const AutoModel = require('../models/autoModel');

const { MESSAGES, AUTO_MODEL_FIELDS } = require('../constants');

router.post('/add_auto', (req, res) => {
  const newAuto = new AutoModel(req.body);

  const validationErrors = carModelValidation(req, res);

  if (validationErrors)
    return res.status(400).send({ message: MESSAGES.FIELD_VALIDATION_FAILED });

  // TODO: check - admin only can create

  newAuto.save((err, data) => {
    if (err) return res.status(500).send({ message: MESSAGES.SERVER_ERROR });
    res.status(200).send({ message: MESSAGES.SUCCESS, id: data._id });
  });
});

router.post('/update_auto', (req, res) => {
  const validationErrors = carModelValidation(req, res);

  // TODO: UPDATE only for admin

  if (validationErrors)
    return res.status(400).send({ message: MESSAGES.FIELD_VALIDATION_FAILED });

  AutoModel.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, car) => {
      if (err) return res.status(500).send({ message: MESSAGES.SERVER_ERROR });
      res.status(200).send({ car, message: MESSAGES.SUCCESS });
    },
  );
});

router.post('/delete_car', (req, res) => {
  // TODO: Delete only for admin

  AutoModel.deleteOne({ _id: req.body.id }, err => {
    if (err) return res.status(500).send({ message: MESSAGES.SERVER_ERROR });
    res.status(200).send({ message: MESSAGES.SUCCESS });
  });
});

function carModelValidation(req, res) {
  req.checkBody(AUTO_MODEL_FIELDS.BRAND).notEmpty();
  req.checkBody(AUTO_MODEL_FIELDS.BRAND).isLength({ min: 2, max: 20 });

  req.checkBody(AUTO_MODEL_FIELDS.MODEL).notEmpty();
  req.checkBody(AUTO_MODEL_FIELDS.MODEL).isLength({ min: 2, max: 20 });

  req.checkBody(AUTO_MODEL_FIELDS.MANUFACTURER).notEmpty();
  req.checkBody(AUTO_MODEL_FIELDS.MANUFACTURER).isLength({ min: 2, max: 20 });

  req.checkBody(AUTO_MODEL_FIELDS.COLOR).notEmpty();
  req.checkBody(AUTO_MODEL_FIELDS.COLOR).isLength({ min: 2, max: 20 });

  req.checkBody(AUTO_MODEL_FIELDS.BODY).notEmpty();
  req.checkBody(AUTO_MODEL_FIELDS.BODY).isLength({ min: 2, max: 20 });

  req.checkBody(AUTO_MODEL_FIELDS.FUEL).notEmpty();
  req.checkBody(AUTO_MODEL_FIELDS.FUEL).isLength({ min: 2, max: 20 });

  req.checkBody(AUTO_MODEL_FIELDS.YEAR).notEmpty();
  req.checkBody(AUTO_MODEL_FIELDS.YEAR).isLength({ min: 4, max: 4 });

  req.checkBody(AUTO_MODEL_FIELDS.CAPACITY).notEmpty();
  req.checkBody(AUTO_MODEL_FIELDS.CAPACITY).isLength({ min: 4, max: 4 });

  req.checkBody(AUTO_MODEL_FIELDS.COST).notEmpty();
  req.checkBody(AUTO_MODEL_FIELDS.COST).isLength({ min: 4, max: 7 });

  req.checkBody(AUTO_MODEL_FIELDS.FOTOS).notEmpty();

  req.checkBody(AUTO_MODEL_FIELDS.DESCRIPTION).notEmpty();
  req.checkBody(AUTO_MODEL_FIELDS.DESCRIPTION).isLength({ min: 5, max: 100 });

  const validationErrors = req.validationErrors();

  return validationErrors;
}

router.post('/get_distinct_options_list', (req, res) => {
  AutoModel.find().distinct(req.body.option, (err, list) => {
    if (err) return res.status(500).send({ message: MESSAGES.SERVER_ERROR });
    res.status(200).send(list);
  });
});

router.post('/get_car_by_id', async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).send({ message: MESSAGES.BAD_REQUEST });
    }

    const car = await AutoModel.findById(req.body.id);
    res.status(200).send(car);
  } catch (err) {
    res.status(500).send({ message: MESSAGES.SERVER_ERROR });
  }

  if (!req.body.id) {
    return req.status(400).send({ message: MESSAGES.BAD_REQUEST });
  }
});

router.post('/get_models_options', (req, res) => {
  AutoModel.find().distinct(
    'model',
    { [AUTO_MODEL_FIELDS.BRAND]: req.body[AUTO_MODEL_FIELDS.BRAND] },
    (err, list) => {
      if (err) return res.status(500).send({ message: MESSAGES.SERVER_ERROR });
      res.status(200).send(list);
    },
  );
});

router.post('/load_cars', async (req, res) => {
  try {
    const { filter, offset, pagination, sort } = req.body;

    const cars = await AutoModel.find(filter)
      .skip(offset)
      .limit(pagination)
      .sort({
        [sort.name]: sort.value,
      });

    res.status(200).send(cars);
  } catch (err) {
    res.status(500).send({ message: MESSAGES.SERVER_ERROR });
  }
});

router.post('/get_manufacturer', (req, res) => {
  req.checkBody(AUTO_MODEL_FIELDS.BRAND).notEmpty();

  const validationErrors = req.validationErrors();

  if (validationErrors)
    return res.status(400).send({ message: MESSAGES.FIELD_VALIDATION_FAILED });

  AutoModel.find().distinct(
    'manufacturer',
    { [AUTO_MODEL_FIELDS.BRAND]: req.body[AUTO_MODEL_FIELDS.BRAND] },
    (err, list) => {
      if (err) return res.status(500).send({ message: MESSAGES.SERVER_ERROR });
      res.status(200).send(list);
    },
  );
});

router.post('/get_range_values', async (req, res) => {
  const fields = [
    AUTO_MODEL_FIELDS.COST,
    AUTO_MODEL_FIELDS.CAPACITY,
    AUTO_MODEL_FIELDS.YEAR,
  ];
  const response = {};

  try {
    await Promise.all([
      (async () => {
        await Promise.all(
          fields.map(async x => {
            const min = await AutoModel.find(req.body)
              .limit(1)
              .sort({ [x]: 1 });

            const max = await AutoModel.find(req.body)
              .limit(1)
              .sort({ [x]: -1 });

            response[`min_${x}`] = min[0][x];
            response[`max_${x}`] = max[0][x];
          }),
        );
      })(),
    ]);

    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: MESSAGES.SERVER_ERROR });
  }
});

module.exports = router;
