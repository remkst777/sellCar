const express = require('express');

const router = express.Router();
const AutoModel = require('../models/autoModel');

router.post('/add_auto', (req, res) => {
  const newAuto = new AutoModel(req.body);

  req.checkBody('brand').notEmpty();
  req.checkBody('brand').isLength({ min: 2, max: 20 });

  req.checkBody('model').notEmpty();
  req.checkBody('model').isLength({ min: 2, max: 20 });

  req.checkBody('manufacturer').notEmpty();
  req.checkBody('manufacturer').isLength({ min: 2, max: 20 });

  req.checkBody('color').notEmpty();
  req.checkBody('color').isLength({ min: 2, max: 20 });

  req.checkBody('body').notEmpty();
  req.checkBody('body').isLength({ min: 2, max: 20 });

  req.checkBody('fuel').notEmpty();
  req.checkBody('fuel').isLength({ min: 2, max: 20 });

  req.checkBody('year').notEmpty();
  req.checkBody('year').isLength({ min: 4, max: 4 });

  req.checkBody('capacity').notEmpty();
  req.checkBody('capacity').isLength({ min: 4, max: 4 });

  req.checkBody('cost').notEmpty();
  req.checkBody('cost').isLength({ min: 4, max: 7 });

  req.checkBody('fotos').notEmpty();

  req.checkBody('description').notEmpty();
  req.checkBody('description').isLength({ min: 5, max: 100 });

  const validationErrors = req.validationErrors();

  if (validationErrors)
    return res.status(400).send({ message: 'Field validation is failed' });

  // TODO: check - admin only can create

  newAuto.save((err, data) => {
    if (err) return res.status(500).send({ message: 'Server error' });
    res.status(200).send({ message: 'Success' });
  });
});

router.post('/get_distinct_options_list', (req, res) => {
  AutoModel.find().distinct(req.body.option, (err, list) => {
    if (err) return res.status(500).send({ message: 'Server error' });
    res.status(200).send(list);
  });
});

router.post('/get_models_options', (req, res) => {
  AutoModel.find().distinct('model', { brand: req.body.brand }, (err, list) => {
    if (err) return res.status(500).send({ message: 'Server error' });
    res.status(200).send(list);
  });
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
    res.status(500).send({ message: 'Server error' });
  }
});

router.post('/get_manufacturer', (req, res) => {
  req.checkBody('brand').notEmpty();

  const validationErrors = req.validationErrors();

  if (validationErrors)
    return res.status(400).send({ message: 'Field validation is failed' });

  AutoModel.find().distinct(
    'manufacturer',
    { brand: req.body.brand },
    (err, list) => {
      if (err) return res.status(500).send({ message: 'Server error' });
      res.status(200).send(list);
    },
  );
});

router.post('/get_range_values', async (req, res) => {
  const fields = ['cost', 'capacity', 'year'];
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
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
