exports.up = async (sql) => {
  await sql`CREATE TABLE IF NOT EXISTS orders (
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		order_user_id VARCHAR,
		order_amount FLOAT,
		order_date DATE,
		paid BOOLEAN
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE IF EXISTS orders`;
};
