exports.up = async (sql) => {
  await sql`CREATE TABLE IF NOT EXISTS users (
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		user_email VARCHAR(100),
		user_password VARCHAR(100),
		first_name VARCHAR(40),
    last_name VARCHAR(40),
		address_1 VARCHAR(100),
		address_2 VARCHAR(100),
		zip_code VARCHAR(10),
		city VARCHAR(100),
		country VARCHAR(100)
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE IF EXISTS users`;
};
