import { CurrencyCode } from '../src/generated/graphql';

export interface Product {
  id: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  price: {
    amount: number;
    currencyCode: CurrencyCode;
  };
}
