import nextra from "nextra";
import docsTheme from "nextra-theme-docs";

export default nextra({
  theme: docsTheme,
  themeConfig: "./theme.config.tsx", // sesuaikan kalau ada
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
});
