exports.up = async (sql) => {
  await sql`CREATE TABLE IF NOT EXISTS products (
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		category VARCHAR(40),
		product_name VARCHAR(40),
		product_price FLOAT,
		description VARCHAR(1000),
		product_image VARCHAR(200),
		product_stock FLOAT,
		product_size VARCHAR(10),
		product_color VARCHAR(20),
		product_tags VARCHAR(40)
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE IF EXISTS products`;
};
