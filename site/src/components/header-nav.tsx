import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import Link from './link';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
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

  &:hover {
    text-decoration: none;
  }
`;

const NavItems = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  min-width: 0;
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
        <Brand to="/">{site.siteMetadata.title}</Brand>
      </NavItems>
    </Wrapper>
  );
};

export default HeaderNav;
