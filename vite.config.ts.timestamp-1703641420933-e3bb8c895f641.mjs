// vite.config.ts
import fs from "node:fs";
import path2 from "node:path";
import process2 from "node:process";
import { defineConfig, loadEnv } from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/vite@5.0.6_sass@1.69.5_terser@5.25.0/node_modules/vite/dist/node/index.js";
import dayjs from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";

// package.json
var package_default = {
  type: "module",
  version: "4.1.0",
  scripts: {
    dev: "vite --host 0.0.0.0",
    build: "vue-tsc && vite build",
    "build:test": "vue-tsc && vite build --mode test",
    serve: "http-server ./dist -o",
    "serve:test": "http-server ./dist-test -o",
    svgo: "svgo -f src/assets/icons",
    new: "plop",
    "generate:icons": "esno ./scripts/generate.icons.ts",
    lint: "npm-run-all -s lint:tsc lint:eslint lint:stylelint",
    "lint:tsc": "vue-tsc",
    "lint:eslint": "eslint . --cache --fix",
    "lint:stylelint": "stylelint src/**/*.{css,scss,vue} --cache --fix --allow-empty-input",
    postinstall: "simple-git-hooks",
    preinstall: "npx only-allow pnpm",
    commit: "git cz",
    release: "bumpp"
  },
  dependencies: {
    "@element-plus/icons-vue": "^2.3.1",
    "@headlessui/vue": "^1.7.16",
    "@vueuse/core": "^10.7.0",
    "@vueuse/integrations": "^10.7.0",
    axios: "^1.6.2",
    dayjs: "^1.11.10",
    defu: "^6.1.3",
    "element-plus": "^2.4.3",
    eruda: "^3.0.1",
    "floating-vue": "2.0.0-beta.24",
    "hotkeys-js": "^3.12.2",
    "lodash-es": "^4.17.21",
    mitt: "^3.0.1",
    mockjs: "^1.1.0",
    nprogress: "^0.2.0",
    overlayscrollbars: "^2.4.5",
    "overlayscrollbars-vue": "^0.5.6",
    "path-browserify": "^1.0.1",
    "path-to-regexp": "^6.2.1",
    pinia: "^2.1.7",
    qs: "^6.11.2",
    scule: "^1.1.1",
    vconsole: "^3.15.1",
    vue: "^3.3.10",
    "vue-m-message": "^4.0.2",
    "vue-router": "^4.2.5"
  },
  devDependencies: {
    "@antfu/eslint-config": "2.3.4",
    "@iconify/json": "^2.2.153",
    "@iconify/vue": "^4.1.1",
    "@types/lodash-es": "^4.17.12",
    "@types/nprogress": "^0.2.3",
    "@types/path-browserify": "^1.0.2",
    "@types/qs": "^6.9.10",
    "@unocss/eslint-plugin": "^0.58.0",
    "@vitejs/plugin-legacy": "^5.2.0",
    "@vitejs/plugin-vue": "^4.5.1",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    autoprefixer: "^10.4.16",
    bumpp: "^9.2.0",
    "cz-git": "^1.8.0",
    eslint: "^8.55.0",
    esno: "^4.0.0",
    "fs-extra": "^11.2.0",
    "http-server": "^14.1.1",
    inquirer: "^9.2.12",
    "lint-staged": "^15.2.0",
    "npm-run-all": "^4.1.5",
    plop: "^4.0.0",
    sass: "^1.69.5",
    "simple-git-hooks": "^2.9.0",
    stylelint: "^15.11.0",
    "stylelint-config-standard-scss": "^11.1.0",
    "stylelint-config-standard-vue": "^1.0.0",
    "stylelint-scss": "^5.3.1",
    "stylelint-stylistic": "^0.4.3",
    svgo: "^3.0.5",
    terser: "^5.25.0",
    typescript: "^5.3.3",
    unocss: "^0.58.0",
    "unplugin-auto-import": "^0.17.2",
    "unplugin-vue-components": "^0.26.0",
    vite: "^5.0.6",
    "vite-plugin-banner": "^0.7.1",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-mock": "^2.9.8",
    "vite-plugin-pages": "^0.32.0",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-vue-inspector": "^4.0.2",
    "vite-plugin-vue-meta-layouts": "^0.3.3",
    "vue-tsc": "^1.8.25"
  },
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged",
    preserveUnused: true
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// vite/plugins/index.ts
import vue from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/@vitejs+plugin-vue@4.5.1_vite@5.0.6_vue@3.3.10/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.0.6_vue@3.3.10/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueLegacy from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/@vitejs+plugin-legacy@5.2.0_terser@5.25.0_vite@5.0.6/node_modules/@vitejs/plugin-legacy/dist/index.mjs";

// vite/plugins/inspector.ts
import Inspector from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/vite-plugin-vue-inspector@4.0.2_vite@5.0.6/node_modules/vite-plugin-vue-inspector/dist/index.mjs";
function createInspector() {
  return Inspector();
}

// vite/plugins/auto-import.ts
import autoImport from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/unplugin-auto-import@0.17.2_@vueuse+core@10.7.0/node_modules/unplugin-auto-import/dist/vite.js";
function createAutoImport() {
  return autoImport({
    imports: [
      "vue",
      "vue-router",
      "pinia"
    ],
    dts: "./src/types/auto-imports.d.ts",
    dirs: [
      "./src/utils/composables/**"
    ]
  });
}

// vite/plugins/components.ts
import components from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.3.10/node_modules/unplugin-vue-components/dist/vite.js";
function createComponents() {
  return components({
    dirs: [
      "src/components",
      "src/layouts/ui-kit"
    ],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: "./src/types/components.d.ts"
  });
}

// vite/plugins/unocss.ts
import Unocss from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/unocss@0.58.0_postcss@8.4.32_vite@5.0.6/node_modules/unocss/dist/vite.mjs";
function createUnocss() {
  return Unocss();
}

// vite/plugins/svg-icon.ts
import path from "node:path";
import process from "node:process";
import { createSvgIconsPlugin } from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.0.6/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// vite/plugins/mock.ts
import { viteMockServe } from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/vite-plugin-mock@2.9.8_mockjs@1.1.0_vite@5.0.6/node_modules/vite-plugin-mock/dist/index.js";
function createMock(env, isBuild) {
  const { VITE_BUILD_MOCK } = env;
  return viteMockServe({
    mockPath: "src/mock",
    localEnabled: !isBuild,
    prodEnabled: isBuild && VITE_BUILD_MOCK === "true",
    injectCode: `
import { setupProdMockServer } from './mockProdServer';
setupProdMockServer();
    `
  });
}

// vite/plugins/layouts.ts
import Layouts from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/vite-plugin-vue-meta-layouts@0.3.3_vite@5.0.6_vue-router@4.2.5/node_modules/vite-plugin-vue-meta-layouts/dist/index.mjs";
function createLayouts() {
  return Layouts({
    defaultLayout: "index"
  });
}

// vite/plugins/pages.ts
import Pages from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/vite-plugin-pages@0.32.0_vite@5.0.6/node_modules/vite-plugin-pages/dist/index.js";
function createPages() {
  return Pages({
    dirs: "src/views",
    exclude: [
      "**/components/**/*.vue"
    ]
  });
}

// vite/plugins/compression.ts
import compression from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.0.6/node_modules/vite-plugin-compression/dist/index.mjs";
function createCompression(env) {
  const { VITE_BUILD_COMPRESS } = env;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugin = [];
  if (compressList.includes("gzip")) {
    plugin.push(
      compression({
        ext: ".gz",
        deleteOriginFile: false
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugin.push(
      compression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: false
      })
    );
  }
  return plugin;
}

// vite/plugins/banner.ts
import banner from "file:///D:/code/2023/web/December/WMS/node_modules/.pnpm/vite-plugin-banner@0.7.1/node_modules/vite-plugin-banner/dist/index.mjs";
function createBanner() {
  return banner(`
/**
 * \u7531 Fantastic-admin \u63D0\u4F9B\u6280\u672F\u652F\u6301
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */
`);
}

// vite/plugins/index.ts
function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [
    vue(),
    vueJsx(),
    vueLegacy({
      renderLegacyChunks: false,
      modernPolyfills: [
        "es.array.at",
        "es.array.find-last"
      ]
    })
  ];
  vitePlugins.push(createInspector());
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createComponents());
  vitePlugins.push(createUnocss());
  vitePlugins.push(createSvgIcon(isBuild));
  vitePlugins.push(createMock(viteEnv, isBuild));
  vitePlugins.push(createLayouts());
  vitePlugins.push(createPages());
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  vitePlugins.push(createBanner());
  return vitePlugins;
}

// vite.config.ts
var __vite_injected_original_dirname = "D:\\code\\2023\\web\\December\\WMS";
var vite_config_default = async ({ mode, command }) => {
  const env = loadEnv(mode, process2.cwd());
  const scssResources = [];
  fs.readdirSync("src/assets/styles/resources").forEach((dirname) => {
    if (fs.statSync(`src/assets/styles/resources/${dirname}`).isFile()) {
      scssResources.push(`@use "src/assets/styles/resources/${dirname}" as *;`);
    }
  });
  return defineConfig({
    base: "./",
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      open: true,
      port: 8081,
      proxy: {
        "/proxy": {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === "serve" && env.VITE_OPEN_PROXY === "true",
          rewrite: (path3) => path3.replace(/\/proxy/, "")
        }
      }
    },
    // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
    build: {
      outDir: mode === "production" ? "dist" : `dist-${mode}`,
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true"
    },
    define: {
      __SYSTEM_INFO__: JSON.stringify({
        pkg: {
          version: package_default.version,
          dependencies: package_default.dependencies,
          devDependencies: package_default.devDependencies
        },
        lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
      })
    },
    plugins: createVitePlugins(env, command === "build"),
    resolve: {
      alias: {
        "@": path2.resolve(__vite_injected_original_dirname, "src"),
        "#": path2.resolve(__vite_injected_original_dirname, "src/types")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join("")
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInZpdGUvcGx1Z2lucy9pbmRleC50cyIsICJ2aXRlL3BsdWdpbnMvaW5zcGVjdG9yLnRzIiwgInZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC50cyIsICJ2aXRlL3BsdWdpbnMvY29tcG9uZW50cy50cyIsICJ2aXRlL3BsdWdpbnMvdW5vY3NzLnRzIiwgInZpdGUvcGx1Z2lucy9zdmctaWNvbi50cyIsICJ2aXRlL3BsdWdpbnMvbW9jay50cyIsICJ2aXRlL3BsdWdpbnMvbGF5b3V0cy50cyIsICJ2aXRlL3BsdWdpbnMvcGFnZXMudHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9iYW5uZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXDIwMjNcXFxcd2ViXFxcXERlY2VtYmVyXFxcXFdNU1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZVxcXFwyMDIzXFxcXHdlYlxcXFxEZWNlbWJlclxcXFxXTVNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvMjAyMy93ZWIvRGVjZW1iZXIvV01TL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXHJcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXHJcbmltcG9ydCBjcmVhdGVWaXRlUGx1Z2lucyBmcm9tICcuL3ZpdGUvcGx1Z2lucydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jICh7IG1vZGUsIGNvbW1hbmQgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuICAvLyBcdTUxNjhcdTVDNDAgc2NzcyBcdThENDRcdTZFOTBcclxuICBjb25zdCBzY3NzUmVzb3VyY2VzID0gW11cclxuICBmcy5yZWFkZGlyU3luYygnc3JjL2Fzc2V0cy9zdHlsZXMvcmVzb3VyY2VzJykuZm9yRWFjaCgoZGlybmFtZSkgPT4ge1xyXG4gICAgaWYgKGZzLnN0YXRTeW5jKGBzcmMvYXNzZXRzL3N0eWxlcy9yZXNvdXJjZXMvJHtkaXJuYW1lfWApLmlzRmlsZSgpKSB7XHJcbiAgICAgIHNjc3NSZXNvdXJjZXMucHVzaChgQHVzZSBcInNyYy9hc3NldHMvc3R5bGVzL3Jlc291cmNlcy8ke2Rpcm5hbWV9XCIgYXMgKjtgKVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XHJcbiAgICBiYXNlOiAnLi8nLFxyXG4gICAgLy8gXHU1RjAwXHU1M0QxXHU2NzBEXHU1MkExXHU1NjY4XHU5MDA5XHU5ODc5IGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvI3NlcnZlci1vcHRpb25zXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgcG9ydDogODA4MSxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL3Byb3h5Jzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9BUFBfQVBJX0JBU0VVUkwsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IGNvbW1hbmQgPT09ICdzZXJ2ZScgJiYgZW52LlZJVEVfT1BFTl9QUk9YWSA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL1xcL3Byb3h5LywgJycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gXHU2Nzg0XHU1RUZBXHU5MDA5XHU5ODc5IGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvI3NlcnZlci1mc3NlcnZlLXJvb3RcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gJ2Rpc3QnIDogYGRpc3QtJHttb2RlfWAsXHJcbiAgICAgIHNvdXJjZW1hcDogZW52LlZJVEVfQlVJTERfU09VUkNFTUFQID09PSAndHJ1ZScsXHJcbiAgICB9LFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIF9fU1lTVEVNX0lORk9fXzogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIHBrZzoge1xyXG4gICAgICAgICAgdmVyc2lvbjogcGtnLnZlcnNpb24sXHJcbiAgICAgICAgICBkZXBlbmRlbmNpZXM6IHBrZy5kZXBlbmRlbmNpZXMsXHJcbiAgICAgICAgICBkZXZEZXBlbmRlbmNpZXM6IHBrZy5kZXZEZXBlbmRlbmNpZXMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYXN0QnVpbGRUaW1lOiBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICB9KSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyhlbnYsIGNvbW1hbmQgPT09ICdidWlsZCcpLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICAgICcjJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy90eXBlcycpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IHNjc3NSZXNvdXJjZXMuam9pbignJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSlcclxufVxyXG4iLCAie1xyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjQuMS4wXCIsXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwiZGV2XCI6IFwidml0ZSAtLWhvc3QgMC4wLjAuMFwiLFxyXG4gICAgXCJidWlsZFwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZFwiLFxyXG4gICAgXCJidWlsZDp0ZXN0XCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSB0ZXN0XCIsXHJcbiAgICBcInNlcnZlXCI6IFwiaHR0cC1zZXJ2ZXIgLi9kaXN0IC1vXCIsXHJcbiAgICBcInNlcnZlOnRlc3RcIjogXCJodHRwLXNlcnZlciAuL2Rpc3QtdGVzdCAtb1wiLFxyXG4gICAgXCJzdmdvXCI6IFwic3ZnbyAtZiBzcmMvYXNzZXRzL2ljb25zXCIsXHJcbiAgICBcIm5ld1wiOiBcInBsb3BcIixcclxuICAgIFwiZ2VuZXJhdGU6aWNvbnNcIjogXCJlc25vIC4vc2NyaXB0cy9nZW5lcmF0ZS5pY29ucy50c1wiLFxyXG4gICAgXCJsaW50XCI6IFwibnBtLXJ1bi1hbGwgLXMgbGludDp0c2MgbGludDplc2xpbnQgbGludDpzdHlsZWxpbnRcIixcclxuICAgIFwibGludDp0c2NcIjogXCJ2dWUtdHNjXCIsXHJcbiAgICBcImxpbnQ6ZXNsaW50XCI6IFwiZXNsaW50IC4gLS1jYWNoZSAtLWZpeFwiLFxyXG4gICAgXCJsaW50OnN0eWxlbGludFwiOiBcInN0eWxlbGludCBzcmMvKiovKi57Y3NzLHNjc3MsdnVlfSAtLWNhY2hlIC0tZml4IC0tYWxsb3ctZW1wdHktaW5wdXRcIixcclxuICAgIFwicG9zdGluc3RhbGxcIjogXCJzaW1wbGUtZ2l0LWhvb2tzXCIsXHJcbiAgICBcInByZWluc3RhbGxcIjogXCJucHggb25seS1hbGxvdyBwbnBtXCIsXHJcbiAgICBcImNvbW1pdFwiOiBcImdpdCBjelwiLFxyXG4gICAgXCJyZWxlYXNlXCI6IFwiYnVtcHBcIlxyXG4gIH0sXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZVwiOiBcIl4yLjMuMVwiLFxyXG4gICAgXCJAaGVhZGxlc3N1aS92dWVcIjogXCJeMS43LjE2XCIsXHJcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC43LjBcIixcclxuICAgIFwiQHZ1ZXVzZS9pbnRlZ3JhdGlvbnNcIjogXCJeMTAuNy4wXCIsXHJcbiAgICBcImF4aW9zXCI6IFwiXjEuNi4yXCIsXHJcbiAgICBcImRheWpzXCI6IFwiXjEuMTEuMTBcIixcclxuICAgIFwiZGVmdVwiOiBcIl42LjEuM1wiLFxyXG4gICAgXCJlbGVtZW50LXBsdXNcIjogXCJeMi40LjNcIixcclxuICAgIFwiZXJ1ZGFcIjogXCJeMy4wLjFcIixcclxuICAgIFwiZmxvYXRpbmctdnVlXCI6IFwiMi4wLjAtYmV0YS4yNFwiLFxyXG4gICAgXCJob3RrZXlzLWpzXCI6IFwiXjMuMTIuMlwiLFxyXG4gICAgXCJsb2Rhc2gtZXNcIjogXCJeNC4xNy4yMVwiLFxyXG4gICAgXCJtaXR0XCI6IFwiXjMuMC4xXCIsXHJcbiAgICBcIm1vY2tqc1wiOiBcIl4xLjEuMFwiLFxyXG4gICAgXCJucHJvZ3Jlc3NcIjogXCJeMC4yLjBcIixcclxuICAgIFwib3ZlcmxheXNjcm9sbGJhcnNcIjogXCJeMi40LjVcIixcclxuICAgIFwib3ZlcmxheXNjcm9sbGJhcnMtdnVlXCI6IFwiXjAuNS42XCIsXHJcbiAgICBcInBhdGgtYnJvd3NlcmlmeVwiOiBcIl4xLjAuMVwiLFxyXG4gICAgXCJwYXRoLXRvLXJlZ2V4cFwiOiBcIl42LjIuMVwiLFxyXG4gICAgXCJwaW5pYVwiOiBcIl4yLjEuN1wiLFxyXG4gICAgXCJxc1wiOiBcIl42LjExLjJcIixcclxuICAgIFwic2N1bGVcIjogXCJeMS4xLjFcIixcclxuICAgIFwidmNvbnNvbGVcIjogXCJeMy4xNS4xXCIsXHJcbiAgICBcInZ1ZVwiOiBcIl4zLjMuMTBcIixcclxuICAgIFwidnVlLW0tbWVzc2FnZVwiOiBcIl40LjAuMlwiLFxyXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuMi41XCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGFudGZ1L2VzbGludC1jb25maWdcIjogXCIyLjMuNFwiLFxyXG4gICAgXCJAaWNvbmlmeS9qc29uXCI6IFwiXjIuMi4xNTNcIixcclxuICAgIFwiQGljb25pZnkvdnVlXCI6IFwiXjQuMS4xXCIsXHJcbiAgICBcIkB0eXBlcy9sb2Rhc2gtZXNcIjogXCJeNC4xNy4xMlwiLFxyXG4gICAgXCJAdHlwZXMvbnByb2dyZXNzXCI6IFwiXjAuMi4zXCIsXHJcbiAgICBcIkB0eXBlcy9wYXRoLWJyb3dzZXJpZnlcIjogXCJeMS4wLjJcIixcclxuICAgIFwiQHR5cGVzL3FzXCI6IFwiXjYuOS4xMFwiLFxyXG4gICAgXCJAdW5vY3NzL2VzbGludC1wbHVnaW5cIjogXCJeMC41OC4wXCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLWxlZ2FjeVwiOiBcIl41LjIuMFwiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNC41LjFcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiOiBcIl4zLjEuMFwiLFxyXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xNlwiLFxyXG4gICAgXCJidW1wcFwiOiBcIl45LjIuMFwiLFxyXG4gICAgXCJjei1naXRcIjogXCJeMS44LjBcIixcclxuICAgIFwiZXNsaW50XCI6IFwiXjguNTUuMFwiLFxyXG4gICAgXCJlc25vXCI6IFwiXjQuMC4wXCIsXHJcbiAgICBcImZzLWV4dHJhXCI6IFwiXjExLjIuMFwiLFxyXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4xNC4xLjFcIixcclxuICAgIFwiaW5xdWlyZXJcIjogXCJeOS4yLjEyXCIsXHJcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjIuMFwiLFxyXG4gICAgXCJucG0tcnVuLWFsbFwiOiBcIl40LjEuNVwiLFxyXG4gICAgXCJwbG9wXCI6IFwiXjQuMC4wXCIsXHJcbiAgICBcInNhc3NcIjogXCJeMS42OS41XCIsXHJcbiAgICBcInNpbXBsZS1naXQtaG9va3NcIjogXCJeMi45LjBcIixcclxuICAgIFwic3R5bGVsaW50XCI6IFwiXjE1LjExLjBcIixcclxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZC1zY3NzXCI6IFwiXjExLjEuMFwiLFxyXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXN0YW5kYXJkLXZ1ZVwiOiBcIl4xLjAuMFwiLFxyXG4gICAgXCJzdHlsZWxpbnQtc2Nzc1wiOiBcIl41LjMuMVwiLFxyXG4gICAgXCJzdHlsZWxpbnQtc3R5bGlzdGljXCI6IFwiXjAuNC4zXCIsXHJcbiAgICBcInN2Z29cIjogXCJeMy4wLjVcIixcclxuICAgIFwidGVyc2VyXCI6IFwiXjUuMjUuMFwiLFxyXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMy4zXCIsXHJcbiAgICBcInVub2Nzc1wiOiBcIl4wLjU4LjBcIixcclxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNy4yXCIsXHJcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjYuMFwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuMC42XCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWJhbm5lclwiOiBcIl4wLjcuMVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1tb2NrXCI6IFwiXjIuOS44XCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLXBhZ2VzXCI6IFwiXjAuMzIuMFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcclxuICAgIFwidml0ZS1wbHVnaW4tdnVlLWluc3BlY3RvclwiOiBcIl40LjAuMlwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi12dWUtbWV0YS1sYXlvdXRzXCI6IFwiXjAuMy4zXCIsXHJcbiAgICBcInZ1ZS10c2NcIjogXCJeMS44LjI1XCJcclxuICB9LFxyXG4gIFwic2ltcGxlLWdpdC1ob29rc1wiOiB7XHJcbiAgICBcInByZS1jb21taXRcIjogXCJwbnBtIGxpbnQtc3RhZ2VkXCIsXHJcbiAgICBcInByZXNlcnZlVW51c2VkXCI6IHRydWVcclxuICB9LFxyXG4gIFwiY29uZmlnXCI6IHtcclxuICAgIFwiY29tbWl0aXplblwiOiB7XHJcbiAgICAgIFwicGF0aFwiOiBcIm5vZGVfbW9kdWxlcy9jei1naXRcIlxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcMjAyM1xcXFx3ZWJcXFxcRGVjZW1iZXJcXFxcV01TXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZVxcXFwyMDIzXFxcXHdlYlxcXFxEZWNlbWJlclxcXFxXTVNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlLzIwMjMvd2ViL0RlY2VtYmVyL1dNUy92aXRlL3BsdWdpbnMvaW5kZXgudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB2dWVMZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5J1xuXG5pbXBvcnQgY3JlYXRlSW5zcGVjdG9yIGZyb20gJy4vaW5zcGVjdG9yJ1xuaW1wb3J0IGNyZWF0ZUF1dG9JbXBvcnQgZnJvbSAnLi9hdXRvLWltcG9ydCdcbmltcG9ydCBjcmVhdGVDb21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cydcbmltcG9ydCBjcmVhdGVVbm9jc3MgZnJvbSAnLi91bm9jc3MnXG5pbXBvcnQgY3JlYXRlU3ZnSWNvbiBmcm9tICcuL3N2Zy1pY29uJ1xuaW1wb3J0IGNyZWF0ZU1vY2sgZnJvbSAnLi9tb2NrJ1xuaW1wb3J0IGNyZWF0ZUxheW91dHMgZnJvbSAnLi9sYXlvdXRzJ1xuaW1wb3J0IGNyZWF0ZVBhZ2VzIGZyb20gJy4vcGFnZXMnXG5pbXBvcnQgY3JlYXRlQ29tcHJlc3Npb24gZnJvbSAnLi9jb21wcmVzc2lvbidcbmltcG9ydCBjcmVhdGVCYW5uZXIgZnJvbSAnLi9iYW5uZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnYsIGlzQnVpbGQgPSBmYWxzZSkge1xuICBjb25zdCB2aXRlUGx1Z2luczogKFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdKVtdID0gW1xuICAgIHZ1ZSgpLFxuICAgIHZ1ZUpzeCgpLFxuICAgIHZ1ZUxlZ2FjeSh7XG4gICAgICByZW5kZXJMZWdhY3lDaHVua3M6IGZhbHNlLFxuICAgICAgbW9kZXJuUG9seWZpbGxzOiBbXG4gICAgICAgICdlcy5hcnJheS5hdCcsXG4gICAgICAgICdlcy5hcnJheS5maW5kLWxhc3QnLFxuICAgICAgXSxcbiAgICB9KSxcbiAgXVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUluc3BlY3RvcigpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUF1dG9JbXBvcnQoKSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVDb21wb25lbnRzKCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlVW5vY3NzKCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU3ZnSWNvbihpc0J1aWxkKSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVNb2NrKHZpdGVFbnYsIGlzQnVpbGQpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUxheW91dHMoKSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVQYWdlcygpKVxuICBpc0J1aWxkICYmIHZpdGVQbHVnaW5zLnB1c2goLi4uY3JlYXRlQ29tcHJlc3Npb24odml0ZUVudikpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQmFubmVyKCkpXG4gIHJldHVybiB2aXRlUGx1Z2luc1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXDIwMjNcXFxcd2ViXFxcXERlY2VtYmVyXFxcXFdNU1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcMjAyM1xcXFx3ZWJcXFxcRGVjZW1iZXJcXFxcV01TXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpbnNwZWN0b3IudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvMjAyMy93ZWIvRGVjZW1iZXIvV01TL3ZpdGUvcGx1Z2lucy9pbnNwZWN0b3IudHNcIjtpbXBvcnQgSW5zcGVjdG9yIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1pbnNwZWN0b3InXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUluc3BlY3RvcigpIHtcbiAgcmV0dXJuIEluc3BlY3RvcigpXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcMjAyM1xcXFx3ZWJcXFxcRGVjZW1iZXJcXFxcV01TXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZVxcXFwyMDIzXFxcXHdlYlxcXFxEZWNlbWJlclxcXFxXTVNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGF1dG8taW1wb3J0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlLzIwMjMvd2ViL0RlY2VtYmVyL1dNUy92aXRlL3BsdWdpbnMvYXV0by1pbXBvcnQudHNcIjtpbXBvcnQgYXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVBdXRvSW1wb3J0KCkge1xuICByZXR1cm4gYXV0b0ltcG9ydCh7XG4gICAgaW1wb3J0czogW1xuICAgICAgJ3Z1ZScsXG4gICAgICAndnVlLXJvdXRlcicsXG4gICAgICAncGluaWEnLFxuICAgIF0sXG4gICAgZHRzOiAnLi9zcmMvdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgIGRpcnM6IFtcbiAgICAgICcuL3NyYy91dGlscy9jb21wb3NhYmxlcy8qKicsXG4gICAgXSxcbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY29kZVxcXFwyMDIzXFxcXHdlYlxcXFxEZWNlbWJlclxcXFxXTVNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2RlXFxcXDIwMjNcXFxcd2ViXFxcXERlY2VtYmVyXFxcXFdNU1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcY29tcG9uZW50cy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS8yMDIzL3dlYi9EZWNlbWJlci9XTVMvdml0ZS9wbHVnaW5zL2NvbXBvbmVudHMudHNcIjtpbXBvcnQgY29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb21wb25lbnRzKCkge1xuICByZXR1cm4gY29tcG9uZW50cyh7XG4gICAgZGlyczogW1xuICAgICAgJ3NyYy9jb21wb25lbnRzJyxcbiAgICAgICdzcmMvbGF5b3V0cy91aS1raXQnLFxuICAgIF0sXG4gICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC50c3gkL10sXG4gICAgZHRzOiAnLi9zcmMvdHlwZXMvY29tcG9uZW50cy5kLnRzJyxcbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY29kZVxcXFwyMDIzXFxcXHdlYlxcXFxEZWNlbWJlclxcXFxXTVNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2RlXFxcXDIwMjNcXFxcd2ViXFxcXERlY2VtYmVyXFxcXFdNU1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcdW5vY3NzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlLzIwMjMvd2ViL0RlY2VtYmVyL1dNUy92aXRlL3BsdWdpbnMvdW5vY3NzLnRzXCI7aW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVW5vY3NzKCkge1xuICByZXR1cm4gVW5vY3NzKClcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY29kZVxcXFwyMDIzXFxcXHdlYlxcXFxEZWNlbWJlclxcXFxXTVNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2RlXFxcXDIwMjNcXFxcd2ViXFxcXERlY2VtYmVyXFxcXFdNU1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcc3ZnLWljb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvMjAyMy93ZWIvRGVjZW1iZXIvV01TL3ZpdGUvcGx1Z2lucy9zdmctaWNvbi50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdmdJY29uKGlzQnVpbGQpIHtcbiAgcmV0dXJuIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucy8nKV0sXG4gICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gICAgc3Znb09wdGlvbnM6IGlzQnVpbGQsXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcMjAyM1xcXFx3ZWJcXFxcRGVjZW1iZXJcXFxcV01TXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZVxcXFwyMDIzXFxcXHdlYlxcXFxEZWNlbWJlclxcXFxXTVNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXG1vY2sudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvMjAyMy93ZWIvRGVjZW1iZXIvV01TL3ZpdGUvcGx1Z2lucy9tb2NrLnRzXCI7aW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1vY2soZW52LCBpc0J1aWxkKSB7XG4gIGNvbnN0IHsgVklURV9CVUlMRF9NT0NLIH0gPSBlbnZcbiAgcmV0dXJuIHZpdGVNb2NrU2VydmUoe1xuICAgIG1vY2tQYXRoOiAnc3JjL21vY2snLFxuICAgIGxvY2FsRW5hYmxlZDogIWlzQnVpbGQsXG4gICAgcHJvZEVuYWJsZWQ6IGlzQnVpbGQgJiYgVklURV9CVUlMRF9NT0NLID09PSAndHJ1ZScsXG4gICAgaW5qZWN0Q29kZTogYFxuaW1wb3J0IHsgc2V0dXBQcm9kTW9ja1NlcnZlciB9IGZyb20gJy4vbW9ja1Byb2RTZXJ2ZXInO1xuc2V0dXBQcm9kTW9ja1NlcnZlcigpO1xuICAgIGAsXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcMjAyM1xcXFx3ZWJcXFxcRGVjZW1iZXJcXFxcV01TXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZVxcXFwyMDIzXFxcXHdlYlxcXFxEZWNlbWJlclxcXFxXTVNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGxheW91dHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvMjAyMy93ZWIvRGVjZW1iZXIvV01TL3ZpdGUvcGx1Z2lucy9sYXlvdXRzLnRzXCI7aW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLW1ldGEtbGF5b3V0cydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTGF5b3V0cygpIHtcbiAgcmV0dXJuIExheW91dHMoe1xuICAgIGRlZmF1bHRMYXlvdXQ6ICdpbmRleCcsXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcMjAyM1xcXFx3ZWJcXFxcRGVjZW1iZXJcXFxcV01TXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZVxcXFwyMDIzXFxcXHdlYlxcXFxEZWNlbWJlclxcXFxXTVNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHBhZ2VzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlLzIwMjMvd2ViL0RlY2VtYmVyL1dNUy92aXRlL3BsdWdpbnMvcGFnZXMudHNcIjtpbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVBhZ2VzKCkge1xuICByZXR1cm4gUGFnZXMoe1xuICAgIGRpcnM6ICdzcmMvdmlld3MnLFxuICAgIGV4Y2x1ZGU6IFtcbiAgICAgICcqKi9jb21wb25lbnRzLyoqLyoudnVlJyxcbiAgICBdLFxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXDIwMjNcXFxcd2ViXFxcXERlY2VtYmVyXFxcXFdNU1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcMjAyM1xcXFx3ZWJcXFxcRGVjZW1iZXJcXFxcV01TXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wcmVzc2lvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS8yMDIzL3dlYi9EZWNlbWJlci9XTVMvdml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzXCI7aW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb21wcmVzc2lvbihlbnYpIHtcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0NPTVBSRVNTIH0gPSBlbnZcbiAgY29uc3QgY29tcHJlc3NMaXN0ID0gVklURV9CVUlMRF9DT01QUkVTUy5zcGxpdCgnLCcpXG4gIGNvbnN0IHBsdWdpbjogYW55W10gPSBbXVxuICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdnemlwJykpIHtcbiAgICBwbHVnaW4ucHVzaChcbiAgICAgIGNvbXByZXNzaW9uKHtcbiAgICAgICAgZXh0OiAnLmd6JyxcbiAgICAgICAgZGVsZXRlT3JpZ2luRmlsZTogZmFsc2UsXG4gICAgICB9KSxcbiAgICApXG4gIH1cbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnYnJvdGxpJykpIHtcbiAgICBwbHVnaW4ucHVzaChcbiAgICAgIGNvbXByZXNzaW9uKHtcbiAgICAgICAgZXh0OiAnLmJyJyxcbiAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxuICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgIClcbiAgfVxuICByZXR1cm4gcGx1Z2luXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcMjAyM1xcXFx3ZWJcXFxcRGVjZW1iZXJcXFxcV01TXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZVxcXFwyMDIzXFxcXHdlYlxcXFxEZWNlbWJlclxcXFxXTVNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGJhbm5lci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS8yMDIzL3dlYi9EZWNlbWJlci9XTVMvdml0ZS9wbHVnaW5zL2Jhbm5lci50c1wiO2ltcG9ydCBiYW5uZXIgZnJvbSAndml0ZS1wbHVnaW4tYmFubmVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVCYW5uZXIoKSB7XG4gIHJldHVybiBiYW5uZXIoYFxuLyoqXG4gKiBcdTc1MzEgRmFudGFzdGljLWFkbWluIFx1NjNEMFx1NEY5Qlx1NjI4MFx1NjcyRlx1NjUyRlx1NjMwMVxuICogUG93ZXJlZCBieSBGYW50YXN0aWMtYWRtaW5cbiAqIEdpdGVlICBodHRwczovL2ZhbnRhc3RpYy1hZG1pbi5naXRlZS5pb1xuICogR2l0aHViIGh0dHBzOi8vZmFudGFzdGljLWFkbWluLmdpdGh1Yi5pb1xuICovXG5gKVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUixPQUFPLFFBQVE7QUFDcFMsT0FBT0EsV0FBVTtBQUNqQixPQUFPQyxjQUFhO0FBQ3BCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sV0FBVzs7O0FDSmxCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxjQUFjO0FBQUEsSUFDZCxPQUFTO0FBQUEsSUFDVCxjQUFjO0FBQUEsSUFDZCxNQUFRO0FBQUEsSUFDUixLQUFPO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxJQUNsQixNQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFDWixlQUFlO0FBQUEsSUFDZixrQkFBa0I7QUFBQSxJQUNsQixhQUFlO0FBQUEsSUFDZixZQUFjO0FBQUEsSUFDZCxRQUFVO0FBQUEsSUFDVixTQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNkLDJCQUEyQjtBQUFBLElBQzNCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHdCQUF3QjtBQUFBLElBQ3hCLE9BQVM7QUFBQSxJQUNULE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxJQUNSLGdCQUFnQjtBQUFBLElBQ2hCLE9BQVM7QUFBQSxJQUNULGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLE1BQVE7QUFBQSxJQUNSLFFBQVU7QUFBQSxJQUNWLFdBQWE7QUFBQSxJQUNiLG1CQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQjtBQUFBLElBQ2xCLE9BQVM7QUFBQSxJQUNULElBQU07QUFBQSxJQUNOLE9BQVM7QUFBQSxJQUNULFVBQVk7QUFBQSxJQUNaLEtBQU87QUFBQSxJQUNQLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsSUFDcEIsMEJBQTBCO0FBQUEsSUFDMUIsYUFBYTtBQUFBLElBQ2IseUJBQXlCO0FBQUEsSUFDekIseUJBQXlCO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsSUFDdEIsMEJBQTBCO0FBQUEsSUFDMUIsY0FBZ0I7QUFBQSxJQUNoQixPQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsSUFDVixRQUFVO0FBQUEsSUFDVixNQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFDWixlQUFlO0FBQUEsSUFDZixVQUFZO0FBQUEsSUFDWixlQUFlO0FBQUEsSUFDZixlQUFlO0FBQUEsSUFDZixNQUFRO0FBQUEsSUFDUixNQUFRO0FBQUEsSUFDUixvQkFBb0I7QUFBQSxJQUNwQixXQUFhO0FBQUEsSUFDYixrQ0FBa0M7QUFBQSxJQUNsQyxpQ0FBaUM7QUFBQSxJQUNqQyxrQkFBa0I7QUFBQSxJQUNsQix1QkFBdUI7QUFBQSxJQUN2QixNQUFRO0FBQUEsSUFDUixRQUFVO0FBQUEsSUFDVixZQUFjO0FBQUEsSUFDZCxRQUFVO0FBQUEsSUFDVix3QkFBd0I7QUFBQSxJQUN4QiwyQkFBMkI7QUFBQSxJQUMzQixNQUFRO0FBQUEsSUFDUixzQkFBc0I7QUFBQSxJQUN0QiwyQkFBMkI7QUFBQSxJQUMzQixvQkFBb0I7QUFBQSxJQUNwQixxQkFBcUI7QUFBQSxJQUNyQix5QkFBeUI7QUFBQSxJQUN6Qiw2QkFBNkI7QUFBQSxJQUM3QixnQ0FBZ0M7QUFBQSxJQUNoQyxXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0Esb0JBQW9CO0FBQUEsSUFDbEIsY0FBYztBQUFBLElBQ2QsZ0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLFFBQVU7QUFBQSxJQUNSLFlBQWM7QUFBQSxNQUNaLE1BQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUNGOzs7QUN2R0EsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGVBQWU7OztBQ0hzUyxPQUFPLGVBQWU7QUFFblUsU0FBUixrQkFBbUM7QUFDeEMsU0FBTyxVQUFVO0FBQ25COzs7QUNKZ1UsT0FBTyxnQkFBZ0I7QUFFeFUsU0FBUixtQkFBb0M7QUFDekMsU0FBTyxXQUFXO0FBQUEsSUFDaEIsU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxNQUNKO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOzs7QUNkOFQsT0FBTyxnQkFBZ0I7QUFFdFUsU0FBUixtQkFBb0M7QUFDekMsU0FBTyxXQUFXO0FBQUEsSUFDaEIsTUFBTTtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDLFVBQVUsY0FBYyxRQUFRO0FBQUEsSUFDMUMsS0FBSztBQUFBLEVBQ1AsQ0FBQztBQUNIOzs7QUNYc1QsT0FBTyxZQUFZO0FBRTFULFNBQVIsZUFBZ0M7QUFDckMsU0FBTyxPQUFPO0FBQ2hCOzs7QUNKMFQsT0FBTyxVQUFVO0FBQzNVLE9BQU8sYUFBYTtBQUNwQixTQUFTLDRCQUE0QjtBQUV0QixTQUFSLGNBQStCLFNBQVM7QUFDN0MsU0FBTyxxQkFBcUI7QUFBQSxJQUMxQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLG1CQUFtQixDQUFDO0FBQUEsSUFDM0QsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUNIOzs7QUNWa1QsU0FBUyxxQkFBcUI7QUFFalUsU0FBUixXQUE0QixLQUFLLFNBQVM7QUFDL0MsUUFBTSxFQUFFLGdCQUFnQixJQUFJO0FBQzVCLFNBQU8sY0FBYztBQUFBLElBQ25CLFVBQVU7QUFBQSxJQUNWLGNBQWMsQ0FBQztBQUFBLElBQ2YsYUFBYSxXQUFXLG9CQUFvQjtBQUFBLElBQzVDLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlkLENBQUM7QUFDSDs7O0FDYndULE9BQU8sYUFBYTtBQUU3VCxTQUFSLGdCQUFpQztBQUN0QyxTQUFPLFFBQVE7QUFBQSxJQUNiLGVBQWU7QUFBQSxFQUNqQixDQUFDO0FBQ0g7OztBQ05vVCxPQUFPLFdBQVc7QUFFdlQsU0FBUixjQUErQjtBQUNwQyxTQUFPLE1BQU07QUFBQSxJQUNYLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOzs7QUNUZ1UsT0FBTyxpQkFBaUI7QUFFelUsU0FBUixrQkFBbUMsS0FBSztBQUM3QyxRQUFNLEVBQUUsb0JBQW9CLElBQUk7QUFDaEMsUUFBTSxlQUFlLG9CQUFvQixNQUFNLEdBQUc7QUFDbEQsUUFBTSxTQUFnQixDQUFDO0FBQ3ZCLE1BQUksYUFBYSxTQUFTLE1BQU0sR0FBRztBQUNqQyxXQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsUUFDVixLQUFLO0FBQUEsUUFDTCxrQkFBa0I7QUFBQSxNQUNwQixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDQSxNQUFJLGFBQWEsU0FBUyxRQUFRLEdBQUc7QUFDbkMsV0FBTztBQUFBLE1BQ0wsWUFBWTtBQUFBLFFBQ1YsS0FBSztBQUFBLFFBQ0wsV0FBVztBQUFBLFFBQ1gsa0JBQWtCO0FBQUEsTUFDcEIsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0EsU0FBTztBQUNUOzs7QUN4QnNULE9BQU8sWUFBWTtBQUUxVCxTQUFSLGVBQWdDO0FBQ3JDLFNBQU8sT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBT2Y7QUFDRDs7O0FWS2UsU0FBUixrQkFBbUMsU0FBUyxVQUFVLE9BQU87QUFDbEUsUUFBTSxjQUFpRDtBQUFBLElBQ3JELElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxNQUNSLG9CQUFvQjtBQUFBLE1BQ3BCLGlCQUFpQjtBQUFBLFFBQ2Y7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDQSxjQUFZLEtBQUssZ0JBQWdCLENBQUM7QUFDbEMsY0FBWSxLQUFLLGlCQUFpQixDQUFDO0FBQ25DLGNBQVksS0FBSyxpQkFBaUIsQ0FBQztBQUNuQyxjQUFZLEtBQUssYUFBYSxDQUFDO0FBQy9CLGNBQVksS0FBSyxjQUFjLE9BQU8sQ0FBQztBQUN2QyxjQUFZLEtBQUssV0FBVyxTQUFTLE9BQU8sQ0FBQztBQUM3QyxjQUFZLEtBQUssY0FBYyxDQUFDO0FBQ2hDLGNBQVksS0FBSyxZQUFZLENBQUM7QUFDOUIsYUFBVyxZQUFZLEtBQUssR0FBRyxrQkFBa0IsT0FBTyxDQUFDO0FBQ3pELGNBQVksS0FBSyxhQUFhLENBQUM7QUFDL0IsU0FBTztBQUNUOzs7QUZ2Q0EsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxPQUFPLEVBQUUsTUFBTSxRQUFRLE1BQU07QUFDMUMsUUFBTSxNQUFNLFFBQVEsTUFBTUMsU0FBUSxJQUFJLENBQUM7QUFFdkMsUUFBTSxnQkFBZ0IsQ0FBQztBQUN2QixLQUFHLFlBQVksNkJBQTZCLEVBQUUsUUFBUSxDQUFDLFlBQVk7QUFDakUsUUFBSSxHQUFHLFNBQVMsK0JBQStCLE9BQU8sRUFBRSxFQUFFLE9BQU8sR0FBRztBQUNsRSxvQkFBYyxLQUFLLHFDQUFxQyxPQUFPLFNBQVM7QUFBQSxJQUMxRTtBQUFBLEVBQ0YsQ0FBQztBQUNELFNBQU8sYUFBYTtBQUFBLElBQ2xCLE1BQU07QUFBQTtBQUFBLElBRU4sUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsVUFBVTtBQUFBLFVBQ1IsUUFBUSxJQUFJO0FBQUEsVUFDWixjQUFjLFlBQVksV0FBVyxJQUFJLG9CQUFvQjtBQUFBLFVBQzdELFNBQVMsQ0FBQUMsVUFBUUEsTUFBSyxRQUFRLFdBQVcsRUFBRTtBQUFBLFFBQzdDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ0wsUUFBUSxTQUFTLGVBQWUsU0FBUyxRQUFRLElBQUk7QUFBQSxNQUNyRCxXQUFXLElBQUkseUJBQXlCO0FBQUEsSUFDMUM7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLGlCQUFpQixLQUFLLFVBQVU7QUFBQSxRQUM5QixLQUFLO0FBQUEsVUFDSCxTQUFTLGdCQUFJO0FBQUEsVUFDYixjQUFjLGdCQUFJO0FBQUEsVUFDbEIsaUJBQWlCLGdCQUFJO0FBQUEsUUFDdkI7QUFBQSxRQUNBLGVBQWUsTUFBTSxFQUFFLE9BQU8scUJBQXFCO0FBQUEsTUFDckQsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVMsa0JBQWtCLEtBQUssWUFBWSxPQUFPO0FBQUEsSUFDbkQsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBS0EsTUFBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxRQUNsQyxLQUFLQSxNQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCLGNBQWMsS0FBSyxFQUFFO0FBQUEsUUFDdkM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInByb2Nlc3MiLCAicHJvY2VzcyIsICJwYXRoIl0KfQo=
