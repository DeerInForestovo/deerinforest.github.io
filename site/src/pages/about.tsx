import React from 'react';
import styled from '@emotion/styled';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import Seo from '../components/seo';
import ScrollBackground from '../components/scroll-background';
import UnderlineH2 from '../components/underline-h2';

let hasLocalAvatar = true;
try {
  require('../../../data/images/avatar.png');
} catch (err) {
  hasLocalAvatar = false;
}

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-12) var(--spacing-6);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-10);

  @media (min-width: 1024px) {
    grid-template-columns: 420px 1fr;
    align-items: start;
    min-height: calc(100vh - 160px);
  }
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: var(--spacing-8);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
`;

const ProfileCard = styled(GlassCard)`
  text-align: center;
  
  .avatar-wrapper {
    margin-bottom: var(--spacing-6);
    display: flex;
    justify-content: center;
    .bio-avatar {
      border-radius: 50%;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      border: 4px solid rgba(255, 255, 255, 0.8);
    }
  }

  h1 {
    font-size: var(--fontSize-6);
    margin-bottom: var(--spacing-2);
    color: var(--color-heading);
  }

  h2 {
    font-size: var(--fontSize-2);
    color: var(--color-text-light);
    margin-bottom: var(--spacing-6);
    font-weight: 600;
  }

  ul.bio-bullets {
    text-align: left;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      position: relative;
      padding-left: var(--spacing-10);
      margin-bottom: var(--spacing-3);
      font-size: var(--fontSize-1);
      line-height: var(--lineHeight-relaxed);
      
      .edu-icon {
        position: absolute;
        left: 0;
        top: 2px;
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
      
      &:nth-of-type(1)::before { display: none; }
      &:nth-of-type(2)::before { display: none; }
      
      strong { color: var(--color-heading); }
    }
  }
`;

const MainContactCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);

  h3 {
    margin-top: 0;
    margin-bottom: var(--spacing-2);
    font-size: var(--fontSize-2);
    color: var(--color-heading);
  }

  a {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    color: var(--color-text);
    text-decoration: none;
    font-weight: 600;
    padding: var(--spacing-3);
    border-radius: 8px;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.8);
      color: #352970;
    }

    .icon {
      font-size: 1.2rem;
      flex-shrink: 0;
    }
  }
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;

  .section-margin {
    margin-bottom: var(--spacing-10);
  }
`;

const ListCard = styled(GlassCard)`
  ul {
    margin: 0;
    padding-left: 0;
    list-style: none;
  }

  li {
    position: relative;
    padding-left: var(--spacing-6);
    margin-bottom: var(--spacing-2);
    line-height: var(--lineHeight-relaxed);
    
    &:last-child {
      margin-bottom: 0;
    }

    &::before {
      content: '✦';
      position: absolute;
      left: 0;
      color: #352970;
    }

    strong {
      color: var(--color-heading);
    }
    
    strong.gold { color: #f1cd00ff; }
    strong.silver { color: #c0c0c0; }
    strong.bronze { color: #cd7f32; }
  }
`;

const PubCard = styled(GlassCard)`
  p {
    line-height: var(--lineHeight-relaxed);
    margin-bottom: 0;
  }
  
  a {
    color: #352970;
    text-decoration: underline;
    font-weight: bold;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--spacing-4);

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    padding: var(--spacing-3) var(--spacing-4);
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    text-decoration: none;
    color: var(--color-heading);
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border: 1px solid rgba(255,255,255,0.4);
    transition: all 0.2s ease;

    .social-icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
      border-radius: 4px;
    }

    &:hover {
      background: #352970;
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(53, 41, 112, 0.2);
    }
  }
`;

const AboutPage = () => {
  return (
    <Layout full={true}>
      <Seo title="About Me" />
      <ScrollBackground minOpacity={0.6}/>
      <PageContainer>
        <LeftCol>
          <ProfileCard>
            <div className="avatar-wrapper">
              {hasLocalAvatar && (
                <StaticImage
                  className="bio-avatar"
                  layout="fixed"
                  formats={['auto', 'webp', 'avif']}
                  src="../../../data/images/avatar.png"
                  width={150}
                  height={150}
                  quality={100}
                  alt="Profile picture"
                />
              )}
            </div>
            <h1>Liang Kuang</h1>
            <h2>DeerInForestovo / 林空鹿饮溪</h2>
            <ul className="bio-bullets">
              <li>
                <StaticImage className="edu-icon" src="../../../data/images/sustech-logo.png" alt="SUSTech" />
                <strong>B.S. in Computer Science</strong> <br />
                <small>Southern University of Science and Technology</small> <br />
                Aug. 2021 - Jun. 2025, <em>Turing Class</em>
              </li>
              <li>
                <StaticImage className="edu-icon" src="../../../data/images/cmu-logo.png" alt="CMU" />
                <strong>M.S. in Electrical and Computer Engineering</strong> <br />
                Carnegie Mellon University <br />
                Aug. 2025 - Dec. 2026
              </li>
            </ul>
          </ProfileCard>

          <MainContactCard>
            <h3>邮箱</h3>
            <a href="mailto:liangk@andrew.cmu.edu">
              <span>liangk@andrew.cmu.edu</span>
            </a>
            <a href="mailto:fzszkl@gmail.com">
              <span>fzszkl@gmail.com</span>
            </a>
          </MainContactCard>
        </LeftCol>

        <RightCol>
          <div className="section-margin">
            <UnderlineH2 zh="荣誉奖项" en="Awards" />
            <ListCard>
              <ul>
                <li><strong className="gold">Gold Medal</strong> @ 46th ICPC Asian Regional Contest (Shanghai)</li>
                <li><strong className="silver">Silver Medal</strong> @ 46th ICPC East-Asian Continental Final (EC-Final)</li>
                <li><strong className="silver">Silver Medal</strong> @ 46th ICPC Asian Regional Contest (Shandong)</li>
                <li><strong className="gold">First Prize</strong> @ NOIp Junior Group (2015-2017) & Senior Group / CSP-S (2017-2020)</li>
                <li><strong className="bronze">Third Prize</strong> @ CTSC (CTS) 2019</li>
              </ul>
            </ListCard>
          </div>

          <div className="section-margin">
            <UnderlineH2 zh="学术发表" en="Publication" />
            <PubCard>
              <p><strong>PRCV 2025:</strong> <a href="https://arxiv.org/abs/2409.18578" target="_blank" rel="noopener noreferrer">An Enhanced Federated Prototype Learning Method under Domain Shift</a></p>
            </PubCard>
          </div>

          <div className="section-margin">
            <UnderlineH2 zh="其他联系方式" en="Socials" />
            <ContactGrid>
              <a href="https://www.linkedin.com/in/liangkuang-cmuece" target="_blank" rel="noopener noreferrer">
                <StaticImage className="social-icon" src="../../../data/images/linkedin.png" alt="LinkedIn" /> LinkedIn
              </a>
              <a href="https://cmu.joinhandshake.com/profiles/kuangliang-cmuece" target="_blank" rel="noopener noreferrer">
                <StaticImage className="social-icon" src="../../../data/images/handshake.png" alt="Handshake" /> Handshake
              </a>
              <a href="https://github.com/DeerInForestovo" target="_blank" rel="noopener noreferrer">
                <StaticImage className="social-icon" src="../../../data/images/github.png" alt="GitHub" /> GitHub
              </a>
              <a href="https://www.xiaohongshu.com/user/profile/62d8f311000000001b000b1a" target="_blank" rel="noopener noreferrer">
                <StaticImage className="social-icon" src="../../../data/images/rednote.png" alt="RedNote" /> RedNote
              </a>
              <a href="https://space.bilibili.com/263186314" target="_blank" rel="noopener noreferrer">
                <StaticImage className="social-icon" src="../../../data/images/bilibili.png" alt="Bilibili" /> Bilibili
              </a>
            </ContactGrid>
          </div>
        </RightCol>
      </PageContainer>
    </Layout>
  );
};

export default AboutPage;
