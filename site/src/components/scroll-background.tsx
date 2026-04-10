import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const bgImages: Record<string, string> = {
  'background-1.jpg': require('../../../data/images/background/background-1.jpg').default || require('../../../data/images/background/background-1.jpg'),
  'background-2.jpg': require('../../../data/images/background/background-2.jpg').default || require('../../../data/images/background/background-2.jpg'),
  'background-3.jpg': require('../../../data/images/background/background-3.jpg').default || require('../../../data/images/background/background-3.jpg'),
  'background-4.jpg': require('../../../data/images/background/background-4.jpg').default || require('../../../data/images/background/background-4.jpg'),
  'background-5.jpg': require('../../../data/images/background/background-5.jpg').default || require('../../../data/images/background/background-5.jpg'),
  'background-6.jpg': require('../../../data/images/background/background-6.jpg').default || require('../../../data/images/background/background-6.jpg'),
  'background-7.jpg': require('../../../data/images/background/background-7.jpg').default || require('../../../data/images/background/background-7.jpg'),
  'main-background.jpg': require('../../../data/images/background/main-background.jpg').default || require('../../../data/images/background/main-background.jpg'),
};

const BackgroundDiv = styled.div<{ bgOpacity: number; bgImage: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  pointer-events: none;
  opacity: ${props => props.bgOpacity};
  transition: opacity 0.1s ease-out;
`;

const ScrollBackground = ({ bgName = 'main-background.jpg', maxScroll = 400, maxOpacity = 0.6, minOpacity = 0.1 }) => {
  const [bgOpacity, setBgOpacity] = useState(maxOpacity);
  
  const currentBg = bgImages[bgName] || bgImages['main-background.jpg'];

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
  }, [maxScroll, maxOpacity, minOpacity]);

  return <BackgroundDiv bgOpacity={bgOpacity} bgImage={currentBg} />;
};

export default ScrollBackground;
