import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import UnderlineH2 from './underline-h2';
import PostList from './post/post-list';

const Wrapper = styled.div`
  position: relative;
`;

const MoreLink = styled.div`
  display: flex;
  justify-content: center;
  padding: var(--spacing-4) 0 var(--spacing-8);

  a {
    display: inline-block;
    text-align: center;
    background: #352970;
    color: #ffffff;
    border-radius: var(--spacing-2);
    font-weight: var(--fontWeight-bold);
    padding: var(--spacing-4) var(--spacing-10);
    text-decoration: none;
    position: relative;
    overflow: hidden;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const RecentlyPublished = () => {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(sort: { frontmatter: { date: DESC } }) {
          nodes {
            fields {
              slug
            }
            excerpt
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              tags
              top
            }
          }
        }
      }
    `
  );

  const pinned = allMdx.nodes
    .filter(n => n.frontmatter.top && n.frontmatter.top > 0)
    .sort((a, b) => a.frontmatter.top - b.frontmatter.top);
  const rest = allMdx.nodes.filter(n => !n.frontmatter.top || n.frontmatter.top <= 0);
  const sorted = [...pinned, ...rest].slice(0, 5);

  return (
    <Wrapper>
      <UnderlineH2 zh="最近文章" en="Recent Posts" />
      <PostList posts={sorted} maxColumns={2} />
      <MoreLink>
        <Link to="/blog">查看所有文章 View All</Link>
      </MoreLink>
    </Wrapper>
  );
};

export default RecentlyPublished;
