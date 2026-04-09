import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Seo from '../components/seo';
import ScrollBackground from '../components/scroll-background';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-16) var(--spacing-4);

  h1 {
    font-size: var(--fontSize-6);
    margin-bottom: var(--spacing-6);
  }

  h2 {
    font-size: var(--fontSize-5);
    margin-top: var(--spacing-10);
    margin-bottom: var(--spacing-4);
  }

  h3 {
    font-size: var(--fontSize-4);
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-4);
  }

  p {
    line-height: var(--lineHeight-relaxed);
    margin-bottom: var(--spacing-4);
  }

  ul {
    margin-bottom: var(--spacing-6);
    padding-left: var(--spacing-6);

    li {
      margin-bottom: var(--spacing-2);
      line-height: var(--lineHeight-relaxed);
    }
  }

  a {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  hr {
    margin: var(--spacing-10) 0;
    border: none;
    border-top: 1px solid var(--color-border);
  }

  strong {
    font-weight: var(--fontWeight-bold);
  }
`;

const AboutPage = () => {
  return (
    <Layout>
      <Seo title="About Me" />
      <ScrollBackground maxOpacity={0.2}/>
      <Container>
        <h1>Who am I?</h1>
        
        <p>I am Liang Kuang, also known as DeerInForestovo/林空鹿饮溪 on some social platforms.</p>
        
        <p>I earned my bachelor's degree in Computer Science from the Southern University of Science and Technology (SUSTech), graduating with honors from the 2021 Turing Class. I am now pursuing a master's degree in Electrical and Computer Engineering at Carnegie Mellon University.</p>
        
        <p>I am actively looking for <strong>SDE internships for summer 2026</strong> and <strong>full-time opportunities starting in 2027</strong>.</p>
        
        <p>Outside of academics, I enjoy connecting with people from around the world and making new friends!</p>
        
        <hr />
        
        <h3>OI/ICPC Awards</h3>
        <ul>
          <li><strong>Gold Medal</strong> @ 46th ICPC Asian Regional Contest (Shanghai)</li>
          <li><strong>Silver Medal</strong> @ 46th ICPC East-Asian Continental Final (EC-Final)</li>
          <li><strong>Silver Medal</strong> @ 46th ICPC Asian Regional Contest (Shandong)</li>
          <li><strong>First Prize</strong> @ NOIp Junior Group 2015, 2016, 2017, and Senior Group 2017, 2018, 2019 (CSP-S), 2020</li>
          <li><strong>Third Prize</strong> @ CTSC (CTS) 2019</li>
        </ul>

        <h3>Publication</h3>
        <p><strong>PRCV 2025:</strong> <a href="https://arxiv.org/abs/2409.18578" target="_blank" rel="noopener noreferrer">An Enhanced Federated Prototype Learning Method under Domain Shift</a></p>

        <h3>Contact/Follow me at:</h3>
        <ul>
          <li>Email: <a href="mailto:liangk@andrew.cmu.edu">liangk@andrew.cmu.edu</a>, <a href="mailto:fzszkl@gmail.com">fzszkl@gmail.com</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/liangkuang-cmuece" target="_blank" rel="noopener noreferrer">LiangKuang</a></li>
          <li>Handshake: <a href="https://cmu.joinhandshake.com/profiles/kuangliang-cmuece" target="_blank" rel="noopener noreferrer">LiangKuang</a></li>
          <li>GitHub: <a href="https://github.com/DeerInForestovo" target="_blank" rel="noopener noreferrer">DeerInForestovo</a></li>
          <li>RedNote: <a href="https://www.xiaohongshu.com/user/profile/62d8f311000000001b000b1a" target="_blank" rel="noopener noreferrer">林空鹿饮溪ovo</a></li>
          <li>Bilibili: <a href="https://space.bilibili.com/263186314" target="_blank" rel="noopener noreferrer">林空鹿饮溪ovo</a></li>
        </ul>
      </Container>
    </Layout>
  );
};

export default AboutPage;
