import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import UnderlineH2 from '../underline-h2';

const Wrapper = styled.div`
  position: relative;
  padding: var(--spacing-12) var(--spacing-8);
  min-height: 300px;

  p {
    font-size: var(--fontSize-2);
    font-weight: var(--fontWeight-bold);
  }

  .post-hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    padding: var(--spacing-8);
  }

  .swallow {
    stroke: #000000;
    stroke-width: 4px;
    fill: none;
    stroke-linecap: round;
    transform: translate(120%, 46%) scale(-1, 1);

    .eye {
      fill: #000000;
    }
  }

  .swallow-1 {
    transform: translate(70%, 20%) scale(-1, 1) rotate(-10deg);
  }
`;

const PostListHero = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          docs {
            blogSlogan
          }
        }
      }
    }
  `);

  return (
    <Wrapper>
      <UnderlineH2 zh="博客" en="Blog" />
      <p>{data.site.siteMetadata.docs.blogSlogan}</p>
    </Wrapper>
  );
};

export default PostListHero;
