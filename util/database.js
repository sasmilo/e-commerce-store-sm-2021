import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';

require('dotenv-safe').config();

const sql = postgres();

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}

export async function getProductInformation() {
  const products = await sql`SELECT * FROM products`;

  return camelcaseRecords(products);
}

// export function getProductInformation() {
//   return [
//     { id: '0', category: 'shirts', productName: 'T-shirt short sleeve' },
//     { id: '1', category: 'shirts', productName: 'Long sleeve' },
//     { id: '2', category: 'shirts', productName: 'Hoodie' },
//     { id: '3', category: 'accessories', productName: 'Keychain' },
//   ];
// }