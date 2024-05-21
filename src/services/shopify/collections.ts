import { env } from '@/config/env';
import { shopifyUrls } from './urls';
import { title } from 'process';

export const getCollections = async (): Promise<
  {
    id: string;
    title: string;
    handle: string;
  }[]
> => {
  const response = await fetch(shopifyUrls.collections.all, {
    headers: new Headers({
      'X-Shopify-Access-Token': env.SHOPIFY_TOKEN,
    }),
  });

  const { smart_collections } = await response.json();

  return smart_collections.map((collection: any) => ({
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
  }));
};

export const getCollectionsProducts = async (id: string) => {
  try {
    const response = await fetch(shopifyUrls.collections.products(id), {
      headers: new Headers({
        'X-Shopify-Access-Token': env.SHOPIFY_TOKEN,
      }),
    });
    const { products } = await response.json();
    return products.map((product: any) => ({
      id: product.product_id,
      title: product.title,
      description: product.body_html,
      price: parseFloat(product.variants[0].price),
      image: product.image.src,
      quantity: product.quantity,
      handle: product.handle,
      tags: product.tags,
    }));
  } catch (error) {
    console.error(error);
  }
};

export const getCollectionsMainProducts = async () => {
  try {
    const response = await fetch(shopifyUrls.collections.mainProducts, {
      headers: new Headers({
        'X-Shopify-Access-Token': env.SHOPIFY_TOKEN,
      }),
    });
    const { products } = await response.json();
    return products.map((product: any) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
      handle: product.handle,
      tags: product.tags,
    }));
  } catch (error) {
    console.error(error);
  }
};
