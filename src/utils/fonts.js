import { Blinker, Tektur } from 'next/font/google';

export const blinker = Blinker({
  subsets: ['latin'],
  variable: '--font-blinker',
  weight: ['100', '200', '300', '400', '600', '700', '800', '900'],
});

export const tektur = Tektur({
  subsets: ['latin'],
  variable: '--font-tektur',
});
