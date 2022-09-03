import React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import runtime from 'react/jsx-runtime';
import { evaluateSync } from '@mdx-js/mdx';

type PluginOptions = {
  renderFunc?: 'renderToStaticMarkup' | 'renderToString';
}

export const vitePluginMdxToHTML = (pluginOptions?: PluginOptions) => {
  return {
    name: "vite-plugin-mdx-to-html",
    transform(source: string, id: string) {
      if (id.endsWith(".mdx")) {
        const mdx = evaluateSync(source, {
          ...runtime as any,
        }).default;

        let html;
        if (pluginOptions?.renderFunc === 'renderToString') {
          html = renderToString(React.createElement(mdx));
        } else {
          html = renderToStaticMarkup(React.createElement(mdx));
        }
        return { code: `export default ${JSON.stringify(html)}` };
      }
    },
  };
};

export default vitePluginMdxToHTML;
