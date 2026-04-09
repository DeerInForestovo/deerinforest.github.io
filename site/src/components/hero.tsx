import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import { StaticImage } from 'gatsby-plugin-image';

let hasLocalAvatar = true;
try {
  require('../../../data/images/avatar.png');
} catch (err) {
  hasLocalAvatar = false;
}

const Avatar = styled.img`
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: var(--spacing-4);
  margin-bottom: var(--spacing-0);
`;

const HeroWrapper = styled.div`
  padding: calc(var(--spacing-16) + 15rem) 0 var(--spacing-12);
  display: flex;

  .left {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .right {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero__hey {
    font-size: var(--fontSize-5);
    font-weight: var(--fontWeight-black);
    line-height: 1.15;
    margin-top: 0;
    margin-bottom: var(--spacing-3);
    letter-spacing: -0.02em;
  }

  .hero__about-title {
    font-family: 'Ma Shan Zheng', cursive;
    font-size: var(--fontSize-7);
    font-weight: var(--fontWeight-normal);
    color: #1a2744;
    margin-top: var(--spacing-4);
    margin-bottom: var(--spacing-6);
    letter-spacing: 0.1em;
  }
`;

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          githubRepo
          docs {
            hey
            title
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const githubUsername = data.site.siteMetadata.githubRepo.split('/')[0];
  const { hey, title } = data.site.siteMetadata.docs;

  return (
    <HeroWrapper>
      <div className="left">
        <h1 className="hero__hey">{hey}</h1>
        <h2 className="hero__about-title">{title}</h2>
      </div>
      <div className="right">
        {hasLocalAvatar ? (
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
        ) : (
          <Avatar
            src={`https://avatars.githubusercontent.com/${githubUsername}`}
            alt="author avatar"
          />
        )}
      </div>
    </HeroWrapper>
  );
};

export default Hero;
