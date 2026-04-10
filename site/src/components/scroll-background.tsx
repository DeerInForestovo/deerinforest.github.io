import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import bgImage from '../../../data/images/background/main-background.jpg';

const BackgroundDiv = styled.div<{ bgOpacity: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  pointer-events: none;
  opacity: ${props => props.bgOpacity};
  transition: opacity 0.1s ease-out;
`;

const ScrollBackground = ({ maxScroll = 400, maxOpacity = 0.6, minOpacity = 0.1 }) => {
  const [bgOpacity, setBgOpacity] = useState(maxOpacity);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (maxScroll < 0) {
        maxScroll = 400;
      }
      let newOpacity = maxOpacity - (scrollY / maxScroll) * (maxOpacity - minOpacity);
      if (newOpacity < minOpacity) newOpacity = minOpacity;
      setBgOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 初始化调用一次以免刷新页面在下面时背景没更新
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <BackgroundDiv bgOpacity={bgOpacity} />;
};

export default ScrollBackground;
