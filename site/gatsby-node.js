// const fs = require('fs');
// const path = require('path/posix');

// async function sourceNodes({ actions, createContentDigest }) {
//   const content = fs.readFileSync(path.join(__dirname, '../data/meta.json'), { encoding: 'utf-8' });

//   let parsedContent;
//   try {
//     parsedContent = JSON.parse(content);
//   } catch {
//     const hint = node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`;
//     throw new Error(`Unable to parse JSON: ${hint}`);
//   }

//   const { createNode } = actions;

//   const siteMetaNode = {
//     ...parsedContent,
//     id: 'site-metadata',
//     parent: null,
//     children: [],
//     internal: {
//       type: 'SiteMetadata',
//       mediaType: 'application/json',
//       content,
//       contentDigest: createContentDigest(parsedContent),
//       description: 'site meta data',
//     },
//   };

//   createNode(siteMetaNode);
// }

// exports.sourceNodes = sourceNodes;

const path = require('path');
const slugify = require('slugify');
const { createFilePath } = require('gatsby-source-filesystem');

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({ node, getNode }).replace(/^\/|\/$/g, '');
    createNodeField({ name: 'slug', node, value: slug });
  }
};

exports.onCreateNode = onCreateNode;

const createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const TagType = schema.buildObjectType({
    name: 'Tag',
    fields: {
      name: { type: `String!` },
    },
    interfaces: [`Node`],
  });

  const typeDefs = `
    type PostNav {
      newer: Mdx
      older: Mdx
    }
    type MdxFrontmatter {
      top: Int
    }
  `;

  createTypes([typeDefs, TagType]);
};

exports.createSchemaCustomization = createSchemaCustomization;

const createResolvers = ({ createResolvers, createNode }) => {
  const resolvers = {
    Mdx: {
      postNav: {
        type: `PostNav`,
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({ type: `Mdx` });
          const postList = Array.from(entries).sort((a, b) => {
            return new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf();
          });
          let index = 0;

          for (let i = 0; i < postList.length; i++) {
            if (postList[i].id === source.id) {
              index = i;
              break;
            }
          }

          return {
            newer: postList[index - 1] || null,
            older: postList[index + 1] || null,
          };
        },
      },
    },

    Query: {
      allTag: {
        type: `TagConnection!`,
        resolve: async (source, args, context, info) => {
          const tagSet = new Set();
          const { entries } = await context.nodeModel.findAll({ type: `Mdx` });
          Array.from(entries).forEach(post => {
            (post.frontmatter.tags || []).forEach(tag => {
              tagSet.add(tag);
            });
          });
          const nodes = Array.from(tagSet).map(tag => {
            return {
              name: tag,
              id: tag,
            };
          });
          return { nodes };
        },
      },
    },
  };

  createResolvers(resolvers);
};

exports.createResolvers = createResolvers;

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `);

  const tagSet = new Set();
  result.data.allMdx.nodes.forEach(node => {
    (node.frontmatter.tags || []).forEach(tag => tagSet.add(tag));
  });

  const tagTemplate = path.resolve('./src/templates/tag-posts.tsx');
  tagSet.forEach(tag => {
    createPage({
      path: `/blog/tags/${slugify(tag, { remove: /[.\\]+/g, lower: true })}`,
      component: tagTemplate,
      context: { tag },
    });
  });
};

exports.createPages = createPages;

const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
  });
};

exports.onCreateWebpackConfig = onCreateWebpackConfig;
