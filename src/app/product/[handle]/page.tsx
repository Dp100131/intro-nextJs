import { ProductView } from '@/components/product/ProductView';
import { redirect } from 'next/navigation';
import { getProduct } from '@/services/shopify/products';

interface ProductPageProps {
  params: {
    handle: string;
  };
  searchParams: {
    id: string;
  };
}

export async function generateMetadata({ searchParams }: ProductPageProps) {
  const { id } = searchParams;
  const product = await getProduct(id);
  return {
    title: product.title,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const { id } = searchParams;

  if (!id) {
    redirect('/store');
  }

  const product = await getProduct(id);

  return <ProductView product={product} />;
}
