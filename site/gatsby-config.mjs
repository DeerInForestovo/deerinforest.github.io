import fs from 'fs';
import path from 'path/posix';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const meta = require('../data/meta.json');

const plugins = [
  {
    resolve: `gatsby-plugin-emotion`,
    options: {
      sourceMap: true,
      autoLabel: 'dev-only',
      labelFormat: `[local]`,
      cssPropOptimization: true,
    },
  },
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/../data/blog`,
      name: `blog`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/../data/images`,
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
      mdxOptions: {
        format: 'md',
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 630,
          },
        },
        `gatsby-remark-prismjs`,
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`,
      ],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMdx } }) => {
            return allMdx.nodes.map(node => {
              return Object.assign({}, node.frontmatter, {
                title: node.frontmatter.title + ' | ' + site.siteMetadata.title,
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + '/blog/' + node.fields.slug,
                guid: site.siteMetadata.siteUrl + '/blog/' + node.fields.slug,
              });
            });
          },
          query: `
            {
              allMdx(
                sort: { frontmatter: { date: DESC } }
              ) {
                nodes {
                  excerpt
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          `,
          output: '/rss.xml',
          title: meta.site.title,
          match: '^/blog/?$',
        },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: meta.site.title,
      short_name: meta.site.title,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#25c19f`,
      display: `minimal-ui`,
      icon: `../data/images/favicon.png`,
    },
  },
  `gatsby-plugin-react-helmet`,
];

try {
  const content = fs.readFileSync(path.join(__dirname, '../data/google-tracking-id'), {
    encoding: 'utf-8',
  });
  if (content) {
    plugins.push({
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: content.trim(),
      },
    });
  }
} catch (err) {
  if (err.code !== 'ENOENT') {
    throw err;
  }
}

const config = {
  siteMetadata: {
    ...meta.site,
    author: meta.author,
    docs: meta.docs,
  },
  pathPrefix: meta.pathPrefix || '',
  plugins,
};

export default config;
