import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

import alertify from 'alertifyjs';

export const showToast = (type, text) => {
  alertify[type](text);
};
