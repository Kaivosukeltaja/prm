const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const episodeTemplate = path.resolve("src/templates/episode.js");
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000,
        filter: { frontmatter: { templateKey: { eq: "episode" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              slug
            }            
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create episode pages.
    result.data.allMarkdownRemark.edges.forEach(edge => {
      const id = edge.node.id;
      createPage({
        // Path for this page — required
        path: `${edge.node.frontmatter.slug}`,
        component: episodeTemplate,
        context: {
          id,
          // Add optional context data to be inserted
          // as props into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "File") {
    createNodeField({ node, name: "slug", value: node.name });
  } else if (node.internal.type === "MarkdownRemark") {
    // const fileNode = getNode(node.parent);
    const value = createFilePath({ node, getNode, basePath: "episodes" });
    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};
