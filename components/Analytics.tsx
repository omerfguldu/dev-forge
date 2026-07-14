import Script from "next/script";

// Umami is privacy-first and cookie-free (build-plan.md 7.2), so no consent
// banner is needed once configured. Renders nothing until a Umami instance
// exists and NEXT_PUBLIC_UMAMI_SCRIPT_URL / NEXT_PUBLIC_UMAMI_WEBSITE_ID are
// set (see .env.example) — safe no-op in the meantime.
export function Analytics() {
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (!scriptUrl || !websiteId) return null;

  return (
    <Script src={scriptUrl} data-website-id={websiteId} strategy="lazyOnload" />
  );
}
