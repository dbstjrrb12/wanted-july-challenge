import { ReactNode, useEffect, useState } from 'react';

const Route = ({ path, component }: RouteProps) => {
  const [pathName, setPathName] = useState(window.location.pathname);

  useEffect(() => {
    const popStateHandler = () => setPathName(window.location.pathname);

    window.addEventListener('popstate', popStateHandler);
    return () => {
      window.removeEventListener('popstate', popStateHandler);
    };
  }, []);

  return pathName === path ? component : null;
};

export { Route };

type RouteProps = {
  path: string;
  component: ReactNode;
};
