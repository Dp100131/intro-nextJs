import { Description } from '@/components/home/Description';
import { Hero } from '@/components/home/Hero';
import React from 'react';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Hero />
      <Description />
      {children}
    </>
  );
}
