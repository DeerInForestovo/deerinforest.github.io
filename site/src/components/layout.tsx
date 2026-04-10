import * as React from 'react';
import styled from '@emotion/styled';
import HeaderNav from './header-nav';
import Footer from './footer';

const GlobalWrapper = styled.div<{ full: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: ${props => props.full ? '100%' : 'var(--maxWidth-wrapper)'};

  main {
    flex: 1;
  }
`;

const Layout = ({ children, full = false }) => {
  return (
    <GlobalWrapper className="global-wrapper" full={full}>
      <HeaderNav />
      <main className={full ? "main-wrapper" : "main-wrapper container"}>{children}</main>
      <Footer />
    </GlobalWrapper>
  );
};

export default Layout;
