import { ProductsWrapper } from '@/components/store/ProductsWrapper';
import { getCollectionsProducts } from '@/services/shopify/collections';
import { getProducts } from '@/services/shopify/products';

interface CategoryProps {
  params: {
    categories: string[];
  };
  searchParams?: any;
}

export default async function category({
  params,
  searchParams,
}: CategoryProps) {
  const collectionId = searchParams.id;
  let products;
  if (collectionId) {
    products = await getCollectionsProducts(collectionId);
  } else {
    products = await getProducts();
  }

  return <ProductsWrapper products={products} />;
}
