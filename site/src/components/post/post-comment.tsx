import React, { useEffect, useRef } from 'react';

type Props = {
  repo: string; // e.g. "owner/repo" - required by utterances
  issueTerm?: string;
  label?: string;
  theme?: string;
  crossorigin?: string;
  async?: boolean;
};

export default function PostComment({
  repo,
  issueTerm = 'pathname',
  label = 'comment',
  theme = 'github-light',
  crossorigin = 'anonymous',
  async = true,
}: Props) {
  const rootElm = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootElm.current) return;

    // If repo isn't provided, do nothing and warn
    if (!repo) {
      // eslint-disable-next-line no-console
      console.warn('PostComment: `repo` prop is required to load utterances.');
      return;
    }

    // Remove any existing children (helps when props change)
    while (rootElm.current.firstChild) {
      rootElm.current.removeChild(rootElm.current.firstChild);
    }

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';

    // Utterances expects these attributes on the <script> element. Use
    // setAttribute for custom attributes and DOM props for boolean/string DOM props.
    script.setAttribute('repo', repo);
    script.setAttribute('issue-term', issueTerm);
    script.setAttribute('label', label);
    script.setAttribute('theme', theme);

    // crossOrigin is a DOM property (note the capital O)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    script.crossOrigin = crossorigin;

    // async is a boolean DOM prop
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    script.async = async;

    // Append script exactly where the docs recommend. The script tag will
    // execute and Utterances will create its iframe inside this container.
    rootElm.current.appendChild(script);

    // Cleanup: remove children when unmounting or when dependencies change
    return () => {
      if (!rootElm.current) return;
      while (rootElm.current.firstChild) {
        rootElm.current.removeChild(rootElm.current.firstChild);
      }
    };
  }, [repo, issueTerm, label, theme, crossorigin, async]);

  return <div id="utterances_container" ref={rootElm} />;
}
