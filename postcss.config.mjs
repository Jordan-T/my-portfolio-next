/**
 * PostCSS pipeline.
 *
 * Scope is deliberate: we polyfill on-track standard CSS only, we do NOT
 * invent syntax or compile away the design-token layer (see .ai/decisions/).
 *
 * - @csstools/postcss-global-data injects the custom-media definitions so they
 *   are visible in every CSS module (PostCSS runs per file in Next).
 * - postcss-custom-media resolves `@media (--mq-*)` to literal queries.
 * - autoprefixer re-added explicitly: declaring a config replaces Next's default.
 *
 * Plugin order matters: global-data must run before custom-media.
 */
const config = {
  plugins: {
    "@csstools/postcss-global-data": {
      files: ["./src/styles/media.css"],
    },
    "postcss-custom-media": {},
    autoprefixer: {},
  },
};

export default config;
