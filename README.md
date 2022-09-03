# vite-plugin-mdx-to-html

Vite Plugin to turn MDX into HTML string.

**Stackblitz Example:** https://stackblitz.com/edit/vite-plugin-mdx-to-html?file=docs.mdx

> **Note**
>
> Looking for using mdx in your React App or some framework? you might want to use [`@mdx-js/rollup`](https://mdxjs.com/packages/rollup/) as [suggested by MDX in their documentation](https://mdxjs.com/docs/getting-started/#bundler). This plugin can be used when you're using vanilla js setup or when you want to use mdx in a static-site-generator based on vite.


## Installation

```sh
npm install --save-dev vite-plugin-mdx-to-html

# OR

yarn add --dev vite-plugin-mdx-to-html
```

Then in `vite.config.ts` or `vite.config.js` add the following code 

## Usage

```js
import { defineConfig } from 'vite';
import { vitePluginMdxToHTML } from 'vite-plugin-mdx-to-html';

export default defineConfig({
  plugins: [vitePluginMdxToHTML()],
});
```

You can now import `.mdx` files anywhere in your vite app.


```js
import intro from './intro.mdx';

document.querySelector('#root').innerHTML = intro;
```