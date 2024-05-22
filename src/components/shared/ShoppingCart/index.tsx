'use client';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './ShoppingCart.module.sass';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { useState } from 'react';
import { ShoppingCartItem } from './ShoppingCartItem';
import { handleCreateCart } from '@/actions';

export const ShoppingCart = () => {
  const { cart } = useShoppingCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);

  const handleBuy = async () => {
    try {
      setIsBuying(true);
      const checkOutUrl = await handleCreateCart(cart);
      if (!checkOutUrl) throw new Error('Error creating checkout.');
      window.localStorage.removeItem('cart');
      window.location.href = checkOutUrl;
    } catch (error) {
      console.error(error);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <button className={styles.ShoppingCart} onClick={handleOpen}>
      <span className={styles.ShoppingCart__counter}>
        {cart.reduce((sum, product) => sum + product.quantity, 0)}
      </span>
      <FaShoppingCart />
      {isOpen && (
        <div className={styles.ShoppingCart__items}>
          {cart.map(item => (
            <ShoppingCartItem key={item.id} item={item} />
          ))}
          <button
            onClick={handleBuy}
            className={styles.ShoppingCart__buyButton}
            disabled={isBuying}
          >
            Buy
          </button>
        </div>
      )}
    </button>
  );
};
