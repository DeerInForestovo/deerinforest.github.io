import * as React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import PostLayout from '../../components/post/post-layout';
import Seo from '../../components/seo';
import PostListHero from '../../components/post/post-list-hero';
import PostList from '../../components/post/post-list';
import ScrollBackground from '../../components/scroll-background';

const BlogIndexWrapper = styled.div`
  padding-top: var(--spacing-16);
`;

const BlogIndex = ({ data }) => {
  const posts = data.allMdx.nodes;

  if (posts.length === 0) {
    return (
      <PostLayout>
        <Seo title="All posts" />
        <ScrollBackground />
        <BlogIndexWrapper>
          <PostListHero />
          <p>No blog posts found. Add markdown posts to "data/blog".</p>
        </BlogIndexWrapper>
      </PostLayout>
    );
  }

  return (
    <PostLayout>
      <Seo title="All posts" />
      <ScrollBackground />
      <BlogIndexWrapper>
        <PostListHero />
        <PostList posts={posts} />
      </BlogIndexWrapper>
    </PostLayout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
          top
        }
      }
    }
  }
`;
