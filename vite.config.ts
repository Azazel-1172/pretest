import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
        suppressWarnings: true,
      },
      manifest: {
        name: "Pretest",
        short_name: "Pretest",
        theme_color: "#070809",
        background_color: "#070809",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            purpose: "maskable",
            src: "./public/icon.svg",
            sizes: "512x512",
            type: "image/png",
          },
          {
            purpose: "any",
            src: "./public/icon.svg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern:
              /https:\/\/itunes\.apple\.com\/tw\/rss\/topfreeapplications/i,
            handler: "CacheFirst",
            options: {
              cacheName: "topfreeapps-cache",
            },
          },
          {
            urlPattern:
              /https:\/\/itunes\.apple\.com\/tw\/rss\/topgrossingapplications/i,
            handler: "CacheFirst",
            options: {
              cacheName: "topgrossingapps-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(js|css|ts)/,
            handler: "CacheFirst",
            options: {
              cacheName: "js-css-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
            },
          },
        ],
      },
    }),
  ],
});
