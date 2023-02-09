import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import sassGlobImports from 'vite-plugin-sass-glob-import';
import ViteYaml from '@modyfi/vite-plugin-yaml'
import Markdown from 'vite-plugin-vue-markdown'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    sassGlobImports(),
    ViteYaml(),
    Markdown({
      // default options passed to markdown-it
      // see: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },

      // npm @vueuse/head
      headEnabled: true,

      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      markdownItSetup(md) {
        const anchor = require('markdown-it-anchor');
        md.use(anchor, {
          // permalink: anchor.permalink.headerLink({ safariReaderFix: true })
          permalink: anchor.permalink.linkInsideHeader({
            symbol: `
              <span style="display: none">Jump to heading</span>
              <span class="permalink" aria-hidden="true">🔗</span>
            `,
            placement: 'after'
          })
        });
        md.use(require("markdown-it-toc-done-right"), {
          // containerId: "table-of-contents"
          // format: (x:any, htmlencode:any) => {
          //   return `<span>${htmlencode(x)}</span>`;
          // }
          level: 1
        });
        md.use(require('markdown-it-mark'));
        md.use(require('markdown-it-prism'), {
          plugins: ['show-language'],
        });
        md.use(require('markdown-it-footnote'));
      },

      // Class names for the wrapper div
      wrapperClasses: 'markdown-body',

      // Component name to wrapper with
      // Place <slot></slot> inside of the wrapper component!
      wrapperComponent: 'MarkdownViewer'
    }),

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
  }
})
