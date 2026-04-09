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
  padding: var(--spacing-16) 0 var(--spacing-12);
  display: flex;

  .btn-link {
    display: inline-block;
    align-self: flex-start;
    background: var(--color-primary);
    padding: 10px 38px;
    color: #fff;
    text-decoration: none;
    border-radius: 100px;
    font-weight: bold;
  }

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
    font-size: var(--fontSize-7);
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

  .hero__about {
    font-size: var(--fontSize-2);
    font-weight: var(--fontWeight-normal);
    color: var(--color-text-light);
    margin-bottom: var(--spacing-8);
    line-height: var(--lineHeight-relaxed);
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
            about
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const githubUsername = data.site.siteMetadata.githubRepo.split('/')[0];
  const { hey, title, about } = data.site.siteMetadata.docs;

  return (
    <HeroWrapper>
      <div className="left">
        <h1 className="hero__hey">{hey}</h1>
        <h2 className="hero__about-title">{title}</h2>
        <p className="hero__about">{about}</p>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Link className="btn-link" to="/blog">
            Blog
          </Link>
          <Link className="btn-link" style={{ backgroundColor: '#1a2744' }} to="/about">
            About me
          </Link>
        </div>
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
