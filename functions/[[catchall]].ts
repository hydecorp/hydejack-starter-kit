/// <reference types="@cloudflare/workers-types/2023-07-01" />

const PRODUCT_ID = 'nuOluY';
const DEFAULT_PRICE = 9900;

interface Env {
  GUMROAD_ACCESS_TOKEN: string
  KV: KVNamespace
}

const formatPrice = (price: number) => {
  return price % 100 === 0
    ? (price / 100).toString()
    : (price / 100).toFixed(2);
}

async function getPrices(request: Request, env: Env, waitUntil: (promise: Promise<any>) => void) {
  let product: any;
  try {
    const cachedProduct = await env.KV.get(PRODUCT_ID, 'json') as any;
    if (cachedProduct) {
      // console.debug('Using cached product');
      product = cachedProduct;
    }
    else {
      // console.debug('Not using cached product :(');
      const productUrl = new URL(`https://api.gumroad.com/v2/products/${PRODUCT_ID}`);
      productUrl.searchParams.append('access_token', env.GUMROAD_ACCESS_TOKEN);

      const productResponse = await fetch(productUrl, { method: 'GET' });
      if (!productResponse.ok) {
        console.error('Product response not ok', productResponse.status);
        return null;
      }

      const productWrapper = await productResponse.clone().json() as any;
      if (productWrapper?.success !== true) {
        console.error('Product response not ok', productWrapper);
        return null
      }

      product = productWrapper.product;

      waitUntil(env.KV.put(PRODUCT_ID, JSON.stringify(product), { expirationTtl: 300 }));
    }
  } catch (err) { 
    console.error('Error fetching product', err);
    return null;
  }

  // console.debug('Has Product:', !!product);

  const country = (request as any).cf?.country ?? request.headers.get('cf-ipcountry');
  if (!country) {
    console.error('No country code');
    return null;
  }

  // console.debug('Country:', country);
  const ppppp = product.purchasing_power_parity_prices as Record<string, number>;
  if (!ppppp) {
    console.error('No prices', product);
    return null;
  }

  const defaultPrice = product.price ?? DEFAULT_PRICE;
  const price = ppppp[country] ?? defaultPrice;

  if (!(country in ppppp)) {
    console.warn('No price for country', country, ppppp);
  }

  if (price === defaultPrice) {
    // console.debug('Price is default', price, 'nothing to do');
    return null;
  }

  return { defaultPrice, price };
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const response = await env.ASSETS.fetch(request);
  if (!response.headers.get('content-type')?.includes('text/html')) {
    // console.debug("not a text/html response");
    return response
  }

  // console.debug("Has secret:", !!env.GUMROAD_ACCESS_TOKEN);

  let promise: Promise<{ defaultPrice: any, price: any }|null> | null = null;

  return new HTMLRewriter()
    .on(".price", {
      async element(element) {
        const result = await (promise ??= getPrices(request, env, context.waitUntil));
        if (result != null) {
          const { defaultPrice, price } = result;
          element.setInnerContent(
            `<del>\$${formatPrice(defaultPrice)}</del> \$${formatPrice(price)}`, 
            { html: true },
          );
        }
      }
    })
    .transform(response);
}
