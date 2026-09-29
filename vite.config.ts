import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      // 마크업 주석은 작업 메모입니다. 배포되는 HTML에는 싣지 않습니다.
      name: "strip-html-comments",
      apply: "build",
      transformIndexHtml: (html) => html.replace(/<!--[\s\S]*?-->/g, ""),
    },
  ],
  build: {
    target: "es2020",
    cssCodeSplit: false,
    reportCompressedSize: true,
  },
});
