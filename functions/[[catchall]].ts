/// <reference types="@cloudflare/workers-types/2023-07-01" />

const ProductId = 'nuOluY';
const DefaultDiscountCode = 'v8b41wp'
const DefaultDiscount = 0.9
const CountryOverride = '';

interface Env {
  GUMROAD_ACCESS_TOKEN: string
  KV?: KVNamespace
}

const formatPrice = (price: number) => {
  return price % 100 === 0
    ? (price / 100).toString()
    : (price / 100).toFixed(2);
}

async function getPrices(request: Request, env: Env, waitUntil: (promise: Promise<any>) => void) {
  let product: any;
  try {
    const cachedProduct = await env.KV?.get(ProductId, 'json') as any;
    if (cachedProduct) {
      console.debug('Using cached product');
      product = cachedProduct;
    }
    else {
      console.debug('Not using cached product');
      const productUrl = new URL(`https://api.gumroad.com/v2/products/${ProductId}`);
      productUrl.searchParams.append('access_token', env.GUMROAD_ACCESS_TOKEN);

      const productResponse = await fetch(productUrl, { method: 'GET', headers: [[ 'user-agent', navigator.userAgent ]] });
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

      env.KV && waitUntil(env.KV.put(ProductId, JSON.stringify(product), { expirationTtl: 300 }));
    }
  } catch (err) { 
    console.error('Error fetching product', err);
    return null;
  }

  console.debug('Has Product:', !!product);

  const country = CountryOverride || ((request as any).cf?.country ?? request.headers.get('cf-ipcountry'));
  if (!country) {
    console.error('No country code');
    return null;
  }

  console.debug('Country:', country);
  const ppppp = product.purchasing_power_parity_prices as Record<string, number>;
  if (!ppppp) {
    console.error('No prices', product);
    return null;
  }

  const defaultPrice = product.price;
  const price = ppppp[country] ?? defaultPrice;

  if (!(country in ppppp)) {
    console.warn('No price for country', country, ppppp);
  }

  return { defaultPrice, price };
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const request = context.request as Request;

  const response = await env.ASSETS.fetch(request);
  if (!response.headers.get('content-type')?.includes('text/html') || !response.body) {
    console.debug("not a text/html response");
    return response;
  }

  console.debug("Has secret:", !!env.GUMROAD_ACCESS_TOKEN);

  let _promise: Promise<{ defaultPrice: any, price: any }|null> | null = null;

  const discountHandler = {
    async element(element) {
      const result = await (_promise ??= getPrices(request, env, context.waitUntil));
      if (result != null) {
        const { defaultPrice, price } = result;
        if (price == defaultPrice) {
          const href = `${element.getAttribute('href')!}/${DefaultDiscountCode}`;
          element.setAttribute('href', href);
        }
      }
    }
  } satisfies HTMLRewriterElementContentHandlers;

  const discountBacklink = `&nbsp;<a href="#fnref:xx" class="reversefootnote" role="doc-backlink">↩︎</a>`;

  const transformedResponse = new HTMLRewriter()
    .on(".price", {
      async element(element) {
        const result = await (_promise ??= getPrices(request, env, context.waitUntil));
        if (result != null) {
          let { defaultPrice, price } = result;
          if (price == defaultPrice) {
            price *= DefaultDiscount // apply generic discount
          } 
          element.setInnerContent(
            html`<del>\$${formatPrice(defaultPrice)}</del> \$${formatPrice(price)}`, 
            { html: true },
          );
        }
      }
    })
    .on(".price-desc", {
      async element(element) {
        const result = await (_promise ??= getPrices(request, env, context.waitUntil));
        if (result != null) {
          const { defaultPrice, price } = result;
          if (price == defaultPrice) {
            element.setInnerContent(
              html`Price permanently reduced by <strong>10%</strong>! You can save the offer code <strong>${DefaultDiscountCode.toUpperCase()}</strong> to apply this discount in the future.${discountBacklink}`, 
              { html: true },
            );
          } else {
            element.setInnerContent(
              html`Location-based discount has been applied. Proceed to <a href="https://gum.co/${ProductId}">Gumroad</a> for details.${discountBacklink}`,
              { html: true },
            );
          }
        }
      }
    })
    .on(`a[href="https://gum.co/${ProductId}"]`, discountHandler)
    .on(`a[href="https://gumroad.com/l/${ProductId}"]`, discountHandler)
    .on('.gumroad-product-embed', {
      async element(element) {
        const result = await (_promise ??= getPrices(request, env, context.waitUntil));
        if (result != null) {
          const { defaultPrice, price } = result;
          if (price == defaultPrice) {
            element.setAttribute('data-gumroad-params', `offer_code=${DefaultDiscountCode}`);
          }
        }
      }
    })
    .transform(response);
    transformedResponse.headers.append('vary', 'cf-ipcountry');
    return transformedResponse;
}

function html(strings: TemplateStringsArray, ...values: any[]) {
  let str = '', i = 0;
  for (const string of strings) str += string + (values[i++] || '');
  return str;
}
