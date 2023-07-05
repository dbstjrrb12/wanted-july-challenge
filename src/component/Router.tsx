import { Children, ReactElement, ReactNode } from 'react';
import { Route } from './Route';

const isReactElement = (child: ReactNode): child is ReactElement => {
  return !!(
    child &&
    typeof child === 'object' &&
    'type' in child &&
    'props' in child
  );
};

const Router = ({ children }: RouteProps) => {
  const routeElements: ReactElement[] = [];

  Children.forEach(children, (child) => {
    if (isReactElement(child) && child.type === Route)
      routeElements.push(child);
  });

  return routeElements;
};

type RouteProps = {
  children: ReactNode;
};

export { Router };
