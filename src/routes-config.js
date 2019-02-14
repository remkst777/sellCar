export const homepage = '/';
export const about = '/about';
export const profile = '/profile';

export const registr = item => `/registr/${item || ''}`;
export const cars = item => `/auto/${item || ''}`;
export const singleCar = (brand, id) => `/auto/${brand || ''}/${id || ''}`;

export const bmw = cars('bmw');
export const ferrari = cars('ferrari');
export const vw = cars('volkswagen');
export const audi = cars('audi');
export const mercedes = cars('mercedes');
export const anotherCar = cars('');
