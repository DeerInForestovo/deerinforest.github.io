import { memo } from 'react';
import { slug } from 'github-slugger';

const getChildrenText = (children: any): string => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(getChildrenText).join('');
  if (children?.props?.children) return getChildrenText(children.props.children);
  return '';
};

export const H2 = memo((props: any) => {
  const { id: originalId, ...rest } = props;
  const text = getChildrenText(props.children);
  const finalId = originalId ? decodeURIComponent(originalId) : slug(text);
  return (
    <h2
      className="anchor anchor__h2"
      {...rest}
      id={finalId}
      style={{ scrollMarginTop: '80px', ...(props.style || {}) }}
    />
  );
});

export const H3 = memo((props: any) => {
  const { id: originalId, ...rest } = props;
  const text = getChildrenText(props.children);
  const finalId = originalId ? decodeURIComponent(originalId) : slug(text);
  return (
    <h3
      className="anchor anchor__h3"
      {...rest}
      id={finalId}
      style={{ scrollMarginTop: '80px', ...(props.style || {}) }}
    />
  );
});

export const H4 = memo((props: any) => {
  const { id: originalId, ...rest } = props;
  const text = getChildrenText(props.children);
  const finalId = originalId ? decodeURIComponent(originalId) : slug(text);
  return (
    <h4
      className="anchor anchor__h4"
      {...rest}
      id={finalId}
      style={{ scrollMarginTop: '80px', ...(props.style || {}) }}
    />
  );
});
