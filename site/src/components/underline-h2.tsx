import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: var(--spacing-12);

  &::after {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 0;
    width: 100%;
    height: 4px;
    border-radius: 99999px;
    background: #ffd53d;
    transform: rotate(-1deg);
  }

  .section-title-zh {
    display: block;
    font-size: var(--fontSize-5);
    font-weight: var(--fontWeight-bold);
    line-height: 1.3;
    color: var(--color-heading);
    margin: 0;
  }

  .section-title-en {
    display: block;
    font-size: var(--fontSize-0);
    font-weight: 900;
    color: #000000;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: var(--spacing-1);
  }
`;

function UnderlineH2({ zh, en }: { zh: string; en: string }) {
  return (
    <Wrapper>
      <h2 className="section-title-zh">{zh}</h2>
      <span className="section-title-en">{en}</span>
    </Wrapper>
  );
}

export default UnderlineH2;
