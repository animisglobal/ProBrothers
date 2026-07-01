// Cloudflare Pages Function — canonical host enforcement.
// Force www.probrothers.com → probrothers.com with a 301, preserving the full
// path + query string. Cloudflare Pages `_redirects` cannot do a hostname-level
// redirect (it silently ignores full-URL sources), so this middleware runs on
// every request and normalizes the host before static asset serving.
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === "www.probrothers.com") {
    url.hostname = "probrothers.com";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
