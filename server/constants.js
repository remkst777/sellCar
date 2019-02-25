const PORT = 5000;
const DB_CONNECTION =
  'mongodb+srv://roman:!!!rem123@cluster0-t3gpa.mongodb.net/xccxxc?retryWrites=true';

const APP_ADMINS = ['remkst777@rambler.ru'];

const MESSAGES = {
  FIELD_VALIDATION_FAILED: 'Field validation is failed',
  SERVER_ERROR: 'Field validation is failed',
  SUCCESS: 'Success',
  BAD_REQUEST: 'Bad request',
  ALREADY_REGISTRED: 'You were registred early. Confirm email.',
  USER_EXISTS: 'Such user already exists',
  LETTER_SENT: 'Letter has been sent. You should confirm your email.',
  ALREADY_CONFIRMED: 'You have already confirmed your email',
  SEND_EMAIL_FIRST: 'You should send your email first',
  CONFIRM_EMAIL: 'You need to confirm your email',
  NOT_AUTHORIZED: 'Not authorized',
  NO_SUCH_USER: 'No such user',
  WRONG_PASSWORD: 'Wrong password',
  ONLY_FOR_ADMIN: 'Action is only for admin',
  CART_LIMIT: 'Cart limit is achieved',
  MAX_IMAGE_SIZE_EXCEED: 'Max image size is exceed',
};

const AUTO_MODEL_FIELDS = {
  BRAND: 'brand',
  MODEL: 'model',
  MANUFACTURER: 'manufacturer',
  COLOR: 'color',
  FUEL: 'fuel',
  BODY: 'body',
  YEAR: 'year',
  CAPACITY: 'capacity',
  COST: 'cost',
  FOTOS: 'fotos',
  DESCRIPTION: 'description',
  POPULARITY: 'popularity',
  DATE: 'date',
  STOCK: 'stock',
};

const USERS_MODEL_FIELDS = {
  EMAIL: 'email',
  USERNAME: 'username',
  PASSWORD: 'password',
  ISVERIFIED: 'isVerified',
  DATE: 'date',
  ROLE: 'role',
  CART: 'cart',
};

const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
};

const SALT_PARAM_1 = 10;
const MAIL_SERVICE = 'Gmail';
const MAIL_SERVICE_USER = 'romanrem888@gmail.com';
const MAIL_SERVICE_PASSWORD = '!!!qqq123';

const MAX_CART_LENGTH = 15;

const PUBLIC_IMAGES = 'public/images';
const MAX_IMAGE_SIZE = 1000000; // 1Mb

module.exports = {
  PORT,
  DB_CONNECTION,
  MESSAGES,
  AUTO_MODEL_FIELDS,
  USERS_MODEL_FIELDS,
  SALT_PARAM_1,
  USER_ROLES,
  APP_ADMINS,
  MAX_CART_LENGTH,
  MAIL_SERVICE,
  MAIL_SERVICE_USER,
  MAIL_SERVICE_PASSWORD,
  PUBLIC_IMAGES,
  MAX_IMAGE_SIZE,
};
