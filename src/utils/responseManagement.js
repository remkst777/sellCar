import { showToast } from 'utils/toasts';

export const responseHandler = async res => {
  const resJson = await res.json();

  if (res.status === 200) {
    showToast(
      'success',
      typeof resJson.message === 'string' ? resJson.message : 'Success',
    );
    return resJson;
  }

  showToast('error', resJson.message);

  throw new Error(resJson.message);
};
