import styled from '@emotion/styled';
import useTOCHighlight from '../../hooks/useTocHighlight';

const linkClassName = 'toc-link';
const linkActiveClassName = 'toc-link--active';

const TOCList = styled.ul<{ isChild?: boolean }>`
  margin: var(--spacing-0);
  padding: var(--spacing-2);

  padding-left: ${props => (props.isChild ? 'var(--spacing-4)' : 'var(--spacing-2)')};

  li {
    list-style: none;
  }

  a {
    color: var(--color-text-light);
    text-decoration: none;

    &:hover {
      color: var(--color-primary);
    }
  }

  a.${linkActiveClassName} {
    color: var(--color-primary);
  }
`;

export interface TOCHeading {
  url: string;
  title: string;
  items?: TOCHeading[];
}

interface TOCProps {
  toc: TOCHeading[];
  isChild?: boolean;
}

const TOCHeadings = ({ toc, isChild = false }: TOCProps) => {
  if (!toc || !toc.length) {
    return null;
  }

  return (
    <TOCList isChild={isChild}>
      {toc.map(heading => {
        return (
          <li key={heading.url}>
            <a href={heading.url} className={linkClassName}>
              {heading.title}
            </a>

            <TOCHeadings isChild={true} toc={heading.items} />
          </li>
        );
      })}
    </TOCList>
  );
};

const TOCWrapper = styled.div`
  position: sticky;
  top: 100px;
  min-width: 18rem;
  max-width: 35rem;
  max-height: calc(100vh - 110px);
  overflow-y: auto;
  margin-left: var(--spacing-3);
  padding-left: var(--spacing-2);
  border-left: 1px solid var(--color-border);
  font-size: var(--fontSize-1);

  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-border);
    border-radius: 4px;
  }
`;

const TOC = ({ toc }: { toc: TOCHeading[] }) => {
  useTOCHighlight({
    linkClassName,
    linkActiveClassName,
    anchorTopOffset: 40,
  });

  return (
    <TOCWrapper>
      <TOCHeadings toc={toc} />
    </TOCWrapper>
  );
};

export default TOC;
