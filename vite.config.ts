import { defineConfig } from 'vite';
import mdx from "@mdx-js/rollup";
import vitePluginMdxToHTML from './plugin/index';

export default defineConfig({
  plugins: [mdx(), vitePluginMdxToHTML()],
})