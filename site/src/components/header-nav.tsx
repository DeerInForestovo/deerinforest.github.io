import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Link from './link';

let hasLocalAvatar = true;
try {
  require('../../../data/images/avatar.png');
} catch (err) {
  hasLocalAvatar = false;
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
`;

const Brand = styled(Link)`
  align-items: center;
  display: flex;
  font-weight: var(--fontWeight-black);
  height: 2rem;
  margin-right: 1rem;
  min-width: 0;
  text-decoration: none;
  color: var(--color-heading);
  letter-spacing: -0.02em;
  transition: all 0.2s ease-in-out;
  padding: 4px 8px;
  border-radius: 8px;

  &:hover {
    text-decoration: none;
    color: var(--color-primary);
    background-color: var(--color-primary-light, #f0f1ff);
    transform: translateY(-1px);
  }
`;

const NavItems = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  min-width: 0;

  .header-avatar {
    border-radius: 50%;
    margin-right: var(--spacing-2);
  }
`;

const NavLinks = styled.div`
  display: flex;
  margin-left: var(--spacing-4);
  gap: var(--spacing-6);

  a {
    color: var(--color-heading);
    text-decoration: none;
    font-weight: var(--fontWeight-bold);
    padding-bottom: 2px;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: var(--color-primary);
      border-bottom: 2px solid var(--color-primary);
    }
  }
`;

const HeaderNav = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <Wrapper className="container">
      <NavItems>
        {hasLocalAvatar && (
          <StaticImage
            className="header-avatar"
            layout="fixed"
            formats={['auto', 'webp', 'avif']}
            src="../../../data/images/avatar.png"
            width={32}
            height={32}
            quality={95}
            alt="Profile avatar"
          />
        )}
        <Brand to="/">
          <span>{site.siteMetadata.title}</span>
        </Brand>
        <NavLinks>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About me</Link>
        </NavLinks>
      </NavItems>
    </Wrapper>
  );
};

export default HeaderNav;
