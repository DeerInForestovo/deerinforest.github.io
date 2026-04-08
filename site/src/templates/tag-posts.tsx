import * as React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import PostList from '../components/post/post-list';

const TagPosts = ({ data, pageContext }) => {
  const posts = data.allMdx.nodes;
  const curTag = pageContext.tag;

  if (posts.length === 0) {
    return (
      <Layout full={false}>
        <Seo title={`Posts tagged with ${curTag}`} />
        <h5>No blog posts tagged with {curTag} found. Add tag to post's tags frontmatter.</h5>
      </Layout>
    );
  }

  return (
    <Layout full={false}>
      <Seo title={`Posts tagged with ${curTag}`} />
      <section>
        <h3>
          {posts.length} posts tagged with 『{curTag}』
        </h3>
        <Link to="/blog/tags">View all tags</Link>
      </section>

      <PostList posts={posts} />
    </Layout>
  );
};

export default TagPosts;

export const pageQuery = graphql`
  query PostsByTag($tag: String!) {
    allMdx(
      filter: { frontmatter: { tags: { eq: $tag } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`;
