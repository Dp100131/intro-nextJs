import { FunctionComponent } from 'react';
import styles from './MainProducts.module.sass';
import Image from 'next/image';

const getProducts = async () => {
  const response = await fetch(
    `${process.env.SHOPIFY_HOST_NAME}/admin/api/2023-10/products.json`,
    {
      headers: new Headers({
        'X-Shopify-Access-Token': process.env.SHOPIFY_API_KEY || '',
      }),
    }
  );

  const { products } = await response.json();

  return products;
};
interface MainProductsProps {}

export const MainProducts: FunctionComponent<MainProductsProps> = async () => {
  const products = await getProducts();
  return (
    <section className={styles.MainProducts}>
      <h3>✨ New products released!</h3>
      <div className={styles.MainProducts__grid}>
        {products?.map((product: any) => {
          const imageSrc = product.images[0].src;
          return (
            <article key={product.id}>
              <p>{product.title}</p>
              <Image src={imageSrc} fill alt={product.title} loading="eager" />
            </article>
          );
        })}
      </div>
    </section>
  );
};
