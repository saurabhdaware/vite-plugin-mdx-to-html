import path from 'path';
import React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import { ViteDevServer } from 'vite';

type PluginOptions = {
  renderFunc?: 'renderToStaticMarkup' | 'renderToString';
}

export const vitePluginMdxToHTML = (pluginOptions?: PluginOptions) => {
  let server: ViteDevServer;
  return {
    name: "vite-plugin-mdx-to-html",
    configureServer(_server: ViteDevServer) {
      server = _server;
    },
    async transform(source: string, id: string) {
      const baseUrl = `file://${path.dirname(id)}/`;
      if (id.endsWith(".mdx")) {
        console.log({source});
        const mdx = (await evaluate(source, {
          ...runtime as any,
          useDynamicImport: true,
          baseUrl
        })).default;

        // const importsInMdx = Array.from(source.matchAll(/ from ["'](.*?)["']/g))
        //   .map((mdxImportMatch) => `import '${mdxImportMatch[1]}';\n`);

        // console.log(String(mdx));
        // // server.watcher.addListener('change', (filename) => {
        // //   if (filename.includes('math.js')) {
        // //     server.watcher.emit('change', id);
        // //   }
        // // });
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
