import { visit } from 'unist-util-visit'

export default function rehypeIgnoreFootnoteRefs() {
  return function (tree) {
    visit(tree, 'element', (node) => {
      // Ignore footnote references (the superscripts)
      if (
        node.tagName === 'sup' ||
        (node.properties && node.properties.hasOwnProperty('dataFootnoteRef')) ||
        (node.properties && node.properties.className && node.properties.className.includes('footnote-ref'))
      ) {
        if (!node.properties) node.properties = {}
        node.properties['data-pagefind-ignore'] = true
      }
    })
  }
}
