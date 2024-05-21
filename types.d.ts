export interface ErrorPagesProps {
  error: Error;
  reset: () => void;
}

export type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  handle: string;
  tags: string;
};

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};
