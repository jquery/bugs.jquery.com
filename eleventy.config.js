const { DateTime } = require('luxon')
const markdownItAnchor = require('markdown-it-anchor')

const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginBundle = require('@11ty/eleventy-plugin-bundle')
const pluginNavigation = require('@11ty/eleventy-navigation')
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy')
const pluginFavicon = require('eleventy-favicon')
const CleanCSS = require('clean-css')

const pluginDrafts = require('./eleventy.config.drafts.js')
const pluginImages = require('./eleventy.config.images.js')

module.exports = function (eleventyConfig) {
  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig.addPassthroughCopy({
    './public/': '/',
    './node_modules/prismjs/themes/prism-okaidia.css': '/css/prism-okaidia.css'
  })

  // Run Eleventy when these files change:
  // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

  // Watch content images for the image pipeline.
  eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpeg}')

  // App plugins
  eleventyConfig.addPlugin(pluginDrafts)
  eleventyConfig.addPlugin(pluginImages)

  // Official plugins
  eleventyConfig.addPlugin(pluginFavicon)
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 }
  })
  eleventyConfig.addPlugin(pluginNavigation)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin)
  eleventyConfig.addPlugin(pluginBundle, {
    transforms: [
      function minifyCss(content) {
        if (this.type === 'css') {
          return new CleanCSS({}).minify(content).styles
        }

        return content
      }
    ]
  })

  // Filters
  eleventyConfig.addFilter('yearsAgo', (datetime) => {
    const date = new Date(datetime / 1000)
    const now = new Date()
    const years = now.getFullYear() - date.getFullYear()
    if (years > 0) {
      return `${years} year${years === 1 ? '' : 's'} ago`
    }
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('dd LLLL yyyy')
  })

  eleventyConfig.addFilter('readableDate', (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(
      format || 'dd LLLL yyyy'
    )
  })

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  })

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return []
    }
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // Return the smallest number argument
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers)
  })

  // Return all the tags used in a collection
  eleventyConfig.addFilter('getAllTags', (collection) => {
    let tagSet = new Set()
    for (let item of collection) {
      ;(item.data.tags || []).forEach((tag) => tagSet.add(tag))
    }
    return Array.from(tagSet)
  })

  eleventyConfig.addFilter('filterTagList', function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1
    )
  })

  // Customize Markdown library settings:
  // eleventyConfig.amendLibrary('md', (mdLib) => {
  //   mdLib.use(markdownItAnchor, {
  //     permalink: markdownItAnchor.permalink.ariaHidden({
  //       placement: 'after',
  //       class: 'header-anchor',
  //       symbol: '#',
  //       ariaHidden: false
  //     }),
  //     level: [1, 2, 3, 4],
  //     slugify: eleventyConfig.getFilter('slugify')
  //   })
  // })

  const rheaders = /^\s*(\=+)\s*([^=]+)\s*\1\s*$/
  eleventyConfig.addFilter('tracToHTML', (text) => {
    const codes = []
    const pres = []
    return (
      // TODO: sanitize HTML content
      text
        // Newlines have extra escapes in the strings
        .replace(/\\\n/g, '\n')
        // Replace `` with <code> tags
        .replace(/`([^`]+?)`/g, (_match, code) => {
          codes.push(code) // Save the code for later
          return `<code></code>`
        })
        // Replace {{{ }}} with <pre> tags
        .replace(/{{{([^]+?)}}}/g, (_match, code) => {
          // Save the code for later
          pres.push(
            // Remove language hints
            code.replace(/^#!\w+\r?\n/, '')
          )
          return `<pre class="wiki"></pre>`
        })
        // Linkify links
        .replace(
          /\[?(https?:\/\/[^\s,\]]+)\]?/g,
          `<a href="$1" class="ext-link"><span class="icon"></span>$1</a>`
        )
        // Linkify ticket references
        .replace(/#(\d+)/g, `<a href="/ticket/$1">$&</a>`)
        // Replace double newlines with paragraphs
        .split(/(?:\r?\n){2}/g)
        .map((line) => {
          if (!line.trim()) {
            return ''
          }
          if (line.startsWith('<pre')) {
            return line
          }
          // Blockquotes
          if (line.startsWith('> ')) {
            return `<blockquote>${line.slice(2)}</blockquote>`
          }
          // Headers
          if (rheaders.test(line)) {
            return line.replace(rheaders, (_all, equals, content) => {
              const level = equals.length
              return `<h${level}>${content}</h${level}>`
            })
          }
          return `<p>${line}</p>`
        })
        .join('')
        // Reinsert code
        .replace(/<code><\/code>/g, () => {
          const code = codes.shift()
          return `<code>${code}</code>`
        })
        // Reinsert pres
        .replace(/<pre class="wiki"><\/pre>/g, () => {
          const code = pres.shift()
          return `<pre class="wiki">${code}</pre>`
        })
    )
  })

  // Shortcodes
  eleventyConfig.addShortcode('currentYear', () => {
    return DateTime.local().toFormat('yyyy')
  })

  // Features to make your build faster (when you need them)

  // If your passthrough copy gets heavy and cumbersome, add this line
  // to emulate the file copy on the dev server. Learn more:
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

  // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    // These are all optional:
    dir: {
      input: 'content', // default: "."
      includes: '../_includes', // default: "_includes"
      data: '../_data', // default: "_data"
      output: '_site'
    },

    // -----------------------------------------------------------------
    // Optional items:
    // -----------------------------------------------------------------

    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

    // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
    // it will transform any absolute URLs in your HTML to include this
    // folder name and does **not** affect where things go in the output folder.
    pathPrefix: '/'
  }
}
