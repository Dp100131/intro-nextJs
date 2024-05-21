import { ProductView } from '@/components/product/ProductView';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { ProductType } from '../../../../types';
import { getProduct } from '@/services/shopify/products';

interface ProductPageProps {
  params: {
    handle: string;
  };
  searchParams: {
    id: string;
  };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const { id } = searchParams;

  const product = await getProduct(id);

  return <ProductView product={product} />;
}
