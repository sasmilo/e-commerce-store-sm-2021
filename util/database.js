import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';

require('dotenv-safe').config();

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    sql = postgres({ ssl: true });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }
  return sql;
}

const sql = connectOneTimeToDatabase();

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}

export async function getProductInformation() {
  const products = await sql`SELECT * FROM products`;

  return camelcaseRecords(products);
}

export async function getProductById(id) {
  const products = await sql`SELECT * FROM products WHERE id =${id}`;

  return camelcaseRecords(products)[0];
}

// export function getProductInformation() {
//   return [
//     { id: '0', category: 'shirts', productName: 'T-shirt short sleeve' },
//     { id: '1', category: 'shirts', productName: 'Long sleeve' },
//     { id: '2', category: 'shirts', productName: 'Hoodie' },
//     { id: '3', category: 'accessories', productName: 'Keychain' },
//   ];
// }
