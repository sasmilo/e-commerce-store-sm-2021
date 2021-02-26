const products = [
  {
    category: 'sport',
    product_name: 'baseball hat',
    product_price: 12.4,
    description: ' ',
    product_image: ' ',
    product_stock: 10,
    product_size: 'L',
    product_color: 'black',
    product_tags: 'men',
  },
  {
    category: 'casual',
    product_name: 'trucker hat',
    product_price: 14.2,
    description: ' ',
    product_image: ' ',
    product_stock: 12,
    product_size: 'L',
    product_color: 'blue',
    product_tags: 'men',
  },
  {
    category: 'winter',
    product_name: 'trapper hat',
    product_price: 22.2,
    description: ' ',
    product_image: ' ',
    product_stock: 9,
    product_size: 'L',
    product_color: 'gray',
    product_tags: 'men',
  },
  {
    category: 'sport',
    product_name: 'baseball hat',
    product_price: 12.4,
    description: ' ',
    product_image: ' ',
    product_stock: 10,
    product_size: 'M',
    product_color: 'black',
    product_tags: 'women',
  },
  {
    category: 'sport',
    product_name: 'swimming cap',
    product_price: 8.7,
    description: ' ',
    product_image: ' ',
    product_stock: 14,
    product_size: 'M',
    product_color: 'pink',
    product_tags: 'women',
  },
  {
    category: 'classic',
    product_name: 'panama hat',
    product_price: 84.8,
    description: ' ',
    product_image: ' ',
    product_stock: 7,
    product_size: 'L',
    product_color: 'white',
    product_tags: 'men',
  },
  {
    category: 'winter',
    product_name: 'beanie hat',
    product_price: 9.4,
    description: ' ',
    product_image: ' ',
    product_stock: 12,
    product_size: 'L',
    product_color: 'dark gray',
    product_tags: 'men',
  },
];

exports.up = async (sql) => {
  await sql`
		INSERT INTO products
		${sql(
      products,
      'category',
      'product_name',
      'product_price',
      'description',
      'product_image',
      'product_stock',
      'product_size',
      'product_color',
      'product_tags',
    )}
  `;
};

exports.down = async (sql) => {
  for (const product of products) {
    await sql`
      DELETE FROM
        products
      WHERE
        product_name = ${product.product_name} AND product_size = ${product.product_size} AND product_color = ${product.product_color} AND product_tags = ${product.product_tags}
    `;
  }
};
