import { FunctionComponent } from 'react';
const getProducts = async () => {
  const response = await fetch(
    `${process.env.SHOPIFY_HOST_NAME}/admin/api/2023-10/products.json`,
    {
      headers: new Headers({
        'X-Shopify-Access-Token': process.env.SHOPIFY_API_KEY || '',
      }),
    }
  );

  return await response.json();
};
interface MainProductsProps {}

export const MainProducts: FunctionComponent<MainProductsProps> = async () => {
  const products = await getProducts();

  console.log(products);
  return (
    <section>
      <h1>MainProducts</h1>
    </section>
  );
};
