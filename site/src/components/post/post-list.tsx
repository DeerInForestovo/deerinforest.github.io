import { Link } from 'gatsby';
import styled from '@emotion/styled';
import PostTags from './post-tags';

interface Props {
  posts: Array<{
    excerpt: string;
    fields: {
      slug: string;
    };
    frontmatter: {
      date: string;
      title: string;
      tags: string[];
      top?: number;
    };
  }>;
  maxColumns?: number;
}

const Wrapper = styled.ol<{ maxColumns: number }>`
  position: relative;
  margin: 0;

  ol {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--spacing-10);
    padding: var(--spacing-24) 0;

    @media (max-width: 40rem) {
      grid-template-columns: 1fr;
    }

    @media (min-width: 96rem) {
      grid-template-columns: repeat(${p => p.maxColumns}, 1fr);
    }
  }

  li {
    list-style: none;
  }
`;

const Post = styled.article`
  text-decoration: none;
  border-radius: var(--spacing-2);
  padding: var(--spacing-6);
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
  background: #ffffff;

  header {
    small {
      display: block;
      color: #4a576c;
      margin-bottom: var(--spacing-2);
    }

    h2 {
      margin: 0 0 var(--spacing-3);
      font-size: var(--fontSize-3);

      .top-badge {
        display: inline-block;
        background: #f57c00;
        color: #fff;
        font-size: 0.65em;
        font-weight: var(--fontWeight-bold);
        line-height: 1;
        padding: 2px 8px;
        border-radius: 4px;
        margin-right: 8px;
        vertical-align: middle;
        position: relative;
        top: -1px;
      }
    }
  }

  section {
    color: var(--color-text-light);

    p {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 0;
    }
  }

  footer {
    margin-top: var(--spacing-8);
  }
`;

const PostList = ({ posts, maxColumns = 3 }: Props) => {
  const pinned = posts
    .filter(p => p.frontmatter.top && p.frontmatter.top > 0)
    .sort((a, b) => a.frontmatter.top! - b.frontmatter.top!);
  const rest = posts.filter(p => !p.frontmatter.top || p.frontmatter.top <= 0);
  const sorted = [...pinned, ...rest];

  return (
    <Wrapper maxColumns={maxColumns}>
      <ol>
        {sorted.map(post => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <Post className="post-list-item" itemScope itemType="http://schema.org/Article">
                <header>
                  <small>{post.frontmatter.date}</small>
                  <h2>
                    <Link to={`/blog/${post.fields.slug}`} itemProp="url">
                      {post.frontmatter.top > 0 && <span className="top-badge">TOP</span>}
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
                <footer>
                  <PostTags tags={post.frontmatter.tags} />
                </footer>
              </Post>
            </li>
          );
        })}
      </ol>
    </Wrapper>
  );
};

export default PostList;
