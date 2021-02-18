import fs from 'fs';
console.log(fs);

export function getProductInformation() {
  return [
    { id: 0, category: 'Shirts', productName: 'T-shirt' },
    { id: 1, category: 'Sneakers', productName: 'Adidas' },
    { id: 2, category: 'Jackets', productName: 'Hoodie' },
    { id: 3, category: 'Accessories', productName: 'Keychain' },
  ];
}
