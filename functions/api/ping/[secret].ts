/// <reference types="@cloudflare/workers-types/2023-07-01" />

import qs from 'qs';

const ShortProductId = 'nuOluY';

const Org = 'hydecorp';
const TeamSlug = 'pro-customers';
const GitHubApiVersion = '2022-11-28';

interface Env {
  GUMROAD_ACCESS_TOKEN: string
  GITHUB_ADMIN_PAT: string
  PING_SECRET: string
  SELLER_ID: string
  KV?: KVNamespace
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, params: { secret } } = context;
  const request = context.request as Request;

  if (secret !== env.PING_SECRET) {
    console.error("Invalid secret:", secret);
    return new Response(null, { status: 401 });
  }

  console.debug("content-type", request.headers.get('content-type'));
  if (!request.headers.get('content-type')?.includes('x-www-form-urlencoded')) {
    console.error("Invalid content-type", request.headers.get('content-type'));
    return new Response(null, { status: 400 });
  }
  const payload = qs.parse(await request.text())
  console.debug("payload", payload);

  if (payload.seller_id !== env.SELLER_ID) {
    console.error("Invalid seller_id, this should never happen");
    return new Response(null, { status: 400 });
  }
  if (payload.short_product_id !== ShortProductId) {
    console.warn("Unsupported product_permalink");
    return new Response(); // ok
  }
  if (!payload.custom_fields) {
    console.error("No custom_fields");
    return new Response(null, { status: 400 });
  }
  console.debug("payload.custom_fields", payload.custom_fields);

  const customFields = payload.custom_fields as Record<string, string>|null;
  const githubHandle = customFields && Object.entries(customFields).find(([k]) => k.trim().toLowerCase().startsWith('github'))?.[1];
  console.debug("githubHandle", githubHandle);

  if (!githubHandle) {
    console.warn("No GitHub handle provided");
    return new Response(); // ok
  }

  const url = `https://api.github.com/orgs/${Org}/teams/${TeamSlug}/memberships/${githubHandle}`;
  const ghResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      'accept': 'application/vnd.github+json',
      'authorization': `Bearer ${env.GITHUB_ADMIN_PAT}`,
      'x-github-api-version': GitHubApiVersion,
      'content-type': 'application/json',
      'user-agent': navigator.userAgent
    },
    body: JSON.stringify({ role: 'member' })
  });
  console.debug("ghResponse/status", ghResponse.status);
  console.debug("ghResponse/body", await ghResponse.text());
  return new Response(null, { status: ghResponse.status });
};
