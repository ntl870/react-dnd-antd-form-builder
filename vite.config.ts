import { defineConfig, LibraryFormats } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      dts({ include: ["lib"] }),
      libInjectCss(),
    ],
    server: {
      port: 3000,
    },
    resolve: {
      alias: [{ find: /^~/, replacement: "" }],
    },
    base: "/",
    build: {
      outDir: "dist",
      sourcemap: false,
      assetsInclude: ["**/*.svg"],
      lib: {
        entry: "lib/index.ts",
        name: "index",
        formats: ["es"] as LibraryFormats[],
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  };
});
