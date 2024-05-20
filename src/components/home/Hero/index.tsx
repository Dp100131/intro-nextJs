import { FunctionComponent } from 'react';

import styles from '@/components/home/Hero/Hero.module.css';

interface HeroProps {}

export const Hero: FunctionComponent<HeroProps> = () => {
  return (
    <section className={styles.Hero}>
      <h1>Future world</h1>
      <h2>Empowering Your Tomorrow, Today!</h2>
    </section>
  );
};
