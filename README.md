# vite-plugin-mdx-to-html

Vite Plugin to turn MDX into HTML string.

**Stackblitz Example:** https://stackblitz.com/edit/vite-plugin-mdx-to-html?file=docs.mdx

> **Warning**
>
> This plugin is built for very small set of usecases like-
> - Using it in template engines that compile to HTML
> - Some Static-Site-Generators that expect HTML
> - SSR in some cases.
> 
> The plugin uses React to render to HTML and if used with CSR, it will try to add React to bundle. You probably don't want that.
> 
> Looking for using mdx in your React App or some framework? you might want to just use [`@mdx-js/rollup`](https://mdxjs.com/packages/rollup/) as [suggested by MDX in their documentation](https://mdxjs.com/docs/getting-started/#bundler).


## Installation

```sh
npm install --save-dev @mdx-js/rollup vite-plugin-mdx-to-html

# OR

yarn add --dev @mdx-js/rollup vite-plugin-mdx-to-html
```

Then in `vite.config.ts` or `vite.config.js` add the following code 

## Usage

```js
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import { vitePluginMdxToHTML } from 'vite-plugin-mdx-to-html';

export default defineConfig({
  // Make sure the vitePluginMdxToHTML comes after rollup's mdx here.
  plugins: [mdx(), vitePluginMdxToHTML()],
});
```

You can now import `.mdx` files anywhere in your vite app and it will be loaded as HTML.


```js
import intro from './intro.mdx';

document.querySelector('#root').innerHTML = intro;
```


## Migration from 0.0.14 -> 0.0.15

Starting 0.0.15, `vite-plugin-mdx-to-html` is supposed to be used alongside `@mdx-js/rollup`

```diff
import { defineConfig } from 'vite';
+ import mdx from '@mdx-js/rollup';
import { vitePluginMdxToHTML } from 'vite-plugin-mdx-to-html';

export default defineConfig({
  // Make sure the vitePluginMdxToHTML comes after rollup's mdx here.
-  plugins: [vitePluginMdxToHTML()],
+  plugins: [mdx(), vitePluginMdxToHTML()],
});
```