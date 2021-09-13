import Client from 'shopify-buy';

export const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_DOMAIN,
  storefrontAccessToken:
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

// Initializing a client to return translated content
export const clientWithTranslatedContent = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_DOMAIN,
  storefrontAccessToken:
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  language: 'ja-JP',
});
