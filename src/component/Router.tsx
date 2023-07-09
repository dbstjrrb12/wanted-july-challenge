import { ReactNode, createContext, useEffect, useState } from 'react';

export const NavigationContext = createContext<{
  currentpath: string;
  changePath: (path: string) => void;
}>({
  currentpath: '/',
  changePath: () => null,
});

const Router = ({ children }: RouteProps) => {
  const [pathName, setPathName] = useState(window.location.pathname);

  const changePath = (path: string) => {
    window.history.pushState({}, '', path);
    setPathName(path);
  };

  useEffect(() => {
    const popStateHandler = () => setPathName(window.location.pathname);

    window.addEventListener('popstate', popStateHandler);
    return () => {
      window.removeEventListener('popstate', popStateHandler);
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ currentpath: pathName, changePath }}>
      {children}
    </NavigationContext.Provider>
  );
};

type RouteProps = {
  children: ReactNode;
};

export { Router };
