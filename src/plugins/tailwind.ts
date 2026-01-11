import type { Plugin } from '@docusaurus/types'
import tailwind from '@tailwindcss/postcss'

export default function tailwindPlugin(): Plugin {
  return {
    name: 'tailwind-plugin',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins = [tailwind]
      return postcssOptions
    },
  }
}
