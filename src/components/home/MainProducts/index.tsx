import { FunctionComponent } from 'react';
import styles from './MainProducts.module.sass';
import Image from 'next/image';
import { getProducts } from '@/services/shopify/products';

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
