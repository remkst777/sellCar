import IPFS from 'ipfs-api';

import { IPFS_HOST, IPFS_PORT, IPFS_PROTOCOL } from './constants';

export function getIpfsApi() {
  return new IPFS({
    host: IPFS_HOST,
    port: IPFS_PORT,
    protocol: IPFS_PROTOCOL,
  });
}

export async function saveText(text) {
  const buf = Buffer.from(text, 'utf8');
  const saveResult = await getIpfsApi().add(buf);
  return saveResult[0].hash;
}

export async function getText(hash) {
  const getResult = await getIpfsApi().get(hash);
  return getResult[0].content.toString('utf8');
}

export async function saveImage(file) {
  const buffer = Buffer.from(file);
  const resp = await getIpfsApi().add(buffer);
  return resp[0].hash;
}
