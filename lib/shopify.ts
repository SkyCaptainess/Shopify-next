import Client from 'shopify-buy';

export const client = Client.buildClient({
  domain: 'bagzed.myshopify.com',
  storefrontAccessToken: '8f7d40bfcd74cba1af28397c056497c4',
});

// Initializing a client to return translated content
export const clientWithTranslatedContent = Client.buildClient({
  domain: 'bagzed.myshopify.com',
  storefrontAccessToken: '8f7d40bfcd74cba1af28397c056497c4',
  language: 'ja-JP',
});
