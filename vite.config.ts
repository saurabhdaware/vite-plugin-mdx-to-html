import { defineConfig } from 'vite';
import vitePluginMdxToHTML from './plugin';

export default defineConfig({
  plugins: [vitePluginMdxToHTML()],
})