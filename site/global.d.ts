import react from 'react';

declare module 'react' {
  interface HTMLAttributes<T> {}
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.png' {
  const value: any;
  export default value;
}
