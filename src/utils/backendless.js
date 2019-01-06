import Backendless from 'backendless';
import {
  BACKENDLESS_ID,
  BACKENDLESS_API_KEY,
  BACKENDLESS_SERVER_URL,
} from './constants';

Backendless.initApp(BACKENDLESS_ID, BACKENDLESS_API_KEY);
Backendless.serverURL = BACKENDLESS_SERVER_URL;

export function getData(
  table,
  pageSize = 10,
  offset = 0,
  sortBy = '',
  whereClause = '',
) {
  const queryBuilder = Backendless.DataQueryBuilder.create();

  queryBuilder
    .setPageSize(pageSize)
    .setOffset(offset)
    .setSortBy(sortBy)
    .setWhereClause(whereClause);

  return Backendless.Data.of(table).find(queryBuilder);
}

export function saveData(tableName, savedObject) {
  return Backendless.Data.of(tableName).save(savedObject);
}
