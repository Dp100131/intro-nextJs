import { FunctionComponent } from 'react';
import Link from 'next/link';
import styles from '@/components/shared/Header/Header.module.sass';
import { validateAccessToken } from '@/utils/auth/validateAccessToken';
import dynamic from 'next/dynamic';

interface HeaderProps {}

const NoSSRShoppingCart = dynamic(
  () =>
    import('@/components/shared/ShoppingCart').then(mod => mod.ShoppingCart),
  {
    ssr: false,
  }
);

export const Header: FunctionComponent<HeaderProps> = async () => {
  const customer = await validateAccessToken();

  return (
    <header className={styles.Header}>
      <nav>
        <ul className={styles.Header__list}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/store">Store</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.Header__user}>
        {customer?.firstName ? (
          <p>Hola! {customer.firstName}</p>
        ) : (
          <Link href="/login">Login</Link>
        )}
        <NoSSRShoppingCart />
      </div>
    </header>
  );
};
