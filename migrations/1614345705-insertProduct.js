const products = [
  {
    category: 'Sport',
    product_name: 'Baseball Hat',
    product_price: 12.4,
    description:
      'The featherlight, fast-drying running hat for hard-working protection whatever weather you run in. Laser-cut ventilation helps you keep a cool head.',
    product_image: 'baseball-cap-men.jpg',
    product_stock: 10,
    product_size: 'L',
    product_color: 'black',
    product_tags: 'men',
  },
  {
    category: 'Casual',
    product_name: 'Trucker Hat',
    product_price: 14.2,
    description:
      'Our new range of Trucker caps are unisex designs and can fit most head sizes with an adjustable strap at the back. The truckers will keep your face shaded and your head cool. Each cap features a sweat band making them ideal for running and outdoor exercise.',
    product_image: 'trucker-hat.jpg',
    product_stock: 12,
    product_size: 'L',
    product_color: 'blue',
    product_tags: 'unisex',
  },
  {
    category: 'Winter',
    product_name: 'Trapper Hat',
    product_price: 22.2,
    description:
      'One of the warmest trapper hats available anywhere, with special advanced insulation technology to protect the head and ears from low temperatures. Long ear flaps can be worn up or down as desired, while the adjustable chin strap ensures that it remains in place, even during periods of high activity, or in windy conditions.',
    product_image: 'trapper-hat.jpg',
    product_stock: 9,
    product_size: 'L',
    product_color: 'gray',
    product_tags: 'men',
  },
  {
    category: 'Sport',
    product_name: 'Baseball Hat',
    product_price: 12.4,
    description:
      'The featherlight, fast-drying running hat for hard-working protection whatever weather you run in. Laser-cut ventilation helps you keep a cool head.',
    product_image: 'baseball-cap-women.jpg',
    product_stock: 10,
    product_size: 'M',
    product_color: 'black',
    product_tags: 'women',
  },
  {
    category: 'Sport',
    product_name: 'Swimming Cap',
    product_price: 8.7,
    description:
      'This high quality 48g Silicone Swimming Cap is designed to be comfortable, easy to put on and take off, and to be an excellent fit. Neon Pink color helps you stand out in open water.',
    product_image: 'swimming-cap.jpg',
    product_stock: 14,
    product_size: 'M',
    product_color: 'pink',
    product_tags: 'women',
  },
  {
    category: 'Classic',
    product_name: 'Panama Hat',
    product_price: 84.8,
    description:
      'The White Panama Hat with Black Band is a great classic, go-to style. The white 100% Toquilla Straw is hand woven with a smooth-to-the-touch finish. This is a great, stylish basic genuine panama hat for both men and women, especially for those who aren’t sure where to start but know they want a wider brim.',
    product_image: 'panama-hat.jpeg',
    product_stock: 7,
    product_size: 'L',
    product_color: 'white',
    product_tags: 'men',
  },
  {
    category: 'Winter',
    product_name: 'Beanie Hat',
    product_price: 9.4,
    description:
      'The stylish cold-weather hat for all your winter adventures. Like your favorite sweater, our slouchy cable knit beanie looks great and keeps you toasty. Your selfies will speak for themselves. This oversized cable knit beanie is stretchy and fits just right. The generous size ensures your head and ears get covered all winter long.',
    product_image: 'beanie-hat.jpg',
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
