export const vitePluginMdxToHTML = () => {
  return {
    name: "vite-plugin-mdx-to-html",
    async transform(source: string, id: string) {
      if (id.endsWith(".mdx")) {
        const code = "import React from 'react';\nimport ReactDOM from 'react-dom/server';\n" + source.replace("export default MDXContent;", "export default ReactDOM.renderToStaticMarkup(React.createElement(MDXContent));");
        return {
          code,
        }

      }
    },
  };
};

export default vitePluginMdxToHTML;
