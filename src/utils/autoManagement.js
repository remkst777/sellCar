import { responseHandler } from './responseManagement';
import { saveImage } from './ipfs';

export const getRangeValuesUtil = async filter => {
  const response = await fetch('/get_range_values', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filter),
  });

  const responseJson = await response.json();

  return responseJson;
};

export const getManufacturerUtil = async brand => {
  const response = await fetch('/get_manufacturer', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ brand }),
  });

  const responseJson = await response.json();

  return responseJson;
};

export const loadCarsUtil = async (filter, sort, pagination, offset) => {
  const response = await fetch('/load_cars', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filter, sort, pagination, offset }),
  });

  const responseJson = await response.json();

  return responseJson;
};

export const saveAutoUtil = async savedObject => {
  const response = await fetch('/add_auto', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(savedObject),
  });

  const responseJson = await responseHandler(response);

  return responseJson;
};

export const getOptionListUtil = async option => {
  const response = await fetch('/get_distinct_options_list', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ option }),
  });

  const responseJson = await response.json();

  return responseJson;
};

export const getManufacturerWithModelsListUtil = async brand => {
  const response = await fetch('/get_models_options', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ brand }),
  });

  const responseJson = await response.json();

  return responseJson;
};

export const getCorrectListForSelect = prevMass => {
  return prevMass.map(x => ({
    label: x || 'all',
    value: x || '',
  }));
};

/* eslint consistent-return: 0 */
export const selectToString = (filter, field) => {
  if (filter[field] && filter[field].value) {
    return filter[field].value;
  }
};

/* eslint consistent-return: 0 */
export const rangeToObj = (filter, minField, maxField) => {
  if (filter[minField] || filter[maxField]) {
    return {
      $gte: filter[minField],
      $lte: filter[maxField],
    };
  }
};

/* eslint-disable */
export const saveArrayOfImages = async filesMass => {
  const hashMass = [];

  await new Promise(resolve => {
    filesMass.map(file => {
      const reader = new FileReader();

      reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {
          const elem = document.createElement('canvas');

          elem.width = this.width;
          elem.height = this.height;

          const ctx = elem.getContext('2d');
          ctx.drawImage(img, 0, 0, this.width, this.height);

          ctx.canvas.toBlob(
            async blob => {
              const file = new File([blob], 'canvas', {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });

              const reader = new FileReader();

              reader.onload = async () => {
                const ipfsHash = await saveImage(reader.result);
                hashMass.push(ipfsHash);

                if (hashMass.length === filesMass.length) {
                  resolve();
                }
              };

              reader.readAsDataURL(file);
            },
            'image/jpeg',
            0.2,
          );
        };
      };

      reader.readAsDataURL(file);
    });
  });

  return hashMass;
};
/* eslint-enable */
