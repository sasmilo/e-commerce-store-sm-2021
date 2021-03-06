import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

require('dotenv-safe').config();

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
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

export async function deleteProductById(id) {
  const products = await sql`
    DELETE FROM products WHERE
    id =${id}
    RETURNING *
    `;

  return camelcaseRecords(products)[0];
}

export async function updateProductNameById(id, productName) {
  const products = await sql`
    UPDATE products SET
      product_name = ${productName}
    WHERE
      id = ${id}
    RETURNING *
    `;

  return camelcaseRecords(products)[0];
}
