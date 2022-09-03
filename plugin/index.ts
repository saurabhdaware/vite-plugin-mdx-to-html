import path from 'path';
import React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import runtime from 'react/jsx-runtime';
import { compile, run } from '@mdx-js/mdx';
import { ViteDevServer } from 'vite';

type PluginOptions = {
  renderFunc?: 'renderToStaticMarkup' | 'renderToString';
  enableImports?: boolean;
}

const mdxToHTML = (mdx: any, pluginOptions?: PluginOptions): string => {
  let html;
  if (pluginOptions?.renderFunc === 'renderToString') {
    html = renderToString(React.createElement(mdx));
  } else {
    html = renderToStaticMarkup(React.createElement(mdx));
  }
  return `export default ${JSON.stringify(html)}`;
}

export const vitePluginMdxToHTML = (pluginOptions?: PluginOptions) => {
  const shouldEnableImports = pluginOptions?.enableImports === false ? false : true;

  return {
    name: "vite-plugin-mdx-to-html",
    async transform(source: string, id: string) {
      if (id.endsWith(".mdx")) {
        const baseUrl = `file://${path.dirname(id)}/`;
        let code = String(await compile(source, {
          outputFormat: 'function-body',
          useDynamicImport: shouldEnableImports,
          baseUrl: shouldEnableImports ? baseUrl : undefined,
        }));

        // Weird hack but we set queryParam on import to make sure the cache is burst on every transform call
        // Without this, vite caches the imported file and serves same file again
        // We then add the same file as blank import in code to make vite reload the server on change
        const cacheBurstParam = `?cache=${new Date().getTime()}`;
        code = code.replace(/import\("(.*?)"\)/g, (...args) => {
          return `import("${args[1]}${cacheBurstParam}")`
        });

        const importsInMdxCode = Array.from(source.matchAll(/ from ["'](.*?)["']/g))
          .map((mdxImportMatch) => `import '${mdxImportMatch[1]}';\n`).join('');

        let mdx = (await run(code, runtime)).default;

        const htmlJsExports = mdxToHTML(mdx, pluginOptions);
        return { code: importsInMdxCode + htmlJsExports };
      }
    },
  };
};

export default vitePluginMdxToHTML;
