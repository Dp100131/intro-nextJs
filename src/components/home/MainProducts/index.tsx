import { FunctionComponent } from 'react';
import styles from './MainProducts.module.sass';
import Image from 'next/image';
import { getCollectionsMainProducts } from '@/services/shopify/collections';

interface MainProductsProps {}

export const MainProducts: FunctionComponent<MainProductsProps> = async () => {
  const products = await getCollectionsMainProducts();
  return (
    <section className={styles.MainProducts}>
      <h3>✨ New products released!</h3>
      <div className={styles.MainProducts__grid}>
        {products?.map((product: any) => {
          const imageSrc = product.image;
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
